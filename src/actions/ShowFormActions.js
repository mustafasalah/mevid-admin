import React from "react";
import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "./../components/services/httpServices";
import { showSchema as schema } from "./ValidationSchema";
import getShows from "../components/services/fakeShowsServices";
import store from "./../store";

const updateShowsList = async () => {
	const shows = await getShows();

	store.dispatch({
		type: ACTIONS.LOAD_DATA,
		dataType: "shows",
		data: shows,
	});
};

const handleProgressUpload = (uploadMsg) => {
	let toastId = React.createRef();

	return {
		toastId,
		onUploadProgress: (p) => {
			const progress = p.loaded / p.total;

			// check if we already displayed a toast
			if (toastId.current === null) {
				toastId.current = toast(uploadMsg || "Upload in Progress", {
					progress: progress,
				});
			} else {
				toast.update(toastId.current, {
					progress: progress,
				});
			}
		},
	};
};

const handleFileUpload = async ({ show_id, name }, value) => {
	const formData = new FormData();
	formData.append("show_name", name);

	if (value.poster) formData.append("poster_image", value.poster);

	if (value.background) formData.append("background_image", value.background);

	if (value.square_image) {
		if (value.square_image instanceof File) {
			formData.append("square_image", value.square_image);
		} else {
			formData.append("deleted_square_image", "true");
		}
	}

	return http.post(`/shows/upload/${show_id}`, formData);
};

const handleGalleryDelete = async ({ show_id }, images) => {
	const formData = new FormData();

	for (let image of images) {
		formData.append("deleted_gallery_images[]", image.url);
	}

	return http.post(`/shows/upload/${show_id}`, formData);
};

const handleGalleryUpload = async ({ show_id, name }, images) => {
	const formData = new FormData();
	formData.append("show_name", name);

	for (let image of images) {
		formData.append("gallery_images[]", image);
	}

	const { onUploadProgress, toastId } = handleProgressUpload(
		"Uploading gallery images..."
	);

	await http.post(`/shows/upload/${show_id}`, formData, {
		onUploadProgress,
	});

	setTimeout(() => toast.done(toastId.current), 250);

	return Promise.resolve();
};

const handleVideosFilesUpload = async ({ show_id, name }, videosFiles) => {
	const formData = new FormData();
	let fileUploadFound = false;

	formData.append("show_name", name);

	for (let videoFile of videosFiles) {
		// Skip not saved deleted video files
		if (videoFile.id === undefined && videoFile.delete) continue;

		formData.append("videos_info[]", JSON.stringify(videoFile));

		if (
			videoFile.download_servers[0].file &&
			videoFile.download_servers[0].file instanceof File
		) {
			fileUploadFound = true;

			formData.append(
				videoFile.download_servers[0].id
					? "updated_videos_files[]"
					: "videos_files[]",
				videoFile.download_servers[0].file
			);
		}
	}

	if (fileUploadFound) {
		const { onUploadProgress, toastId } = handleProgressUpload(
			"Uploading video files..."
		);

		await http.post(`/shows/upload/videos/${show_id}`, formData, {
			onUploadProgress,
		});

		setTimeout(() => toast.done(toastId.current), 250);

		return Promise.resolve();
	}

	return http.post(`/shows/upload/videos/${show_id}`, formData);
};

const handleWatchingVideoUpload = async ({ show_id, name }, video) => {
	const formData = new FormData();
	let uploadFile = false,
		changeFound = false;

	formData.append("show_name", name);
	formData.append("server_name", video.name);

	video.id && formData.append("server_id", video.id);

	for (let res in video.files) {
		if (video.files[res].id) {
			if (video.files[res].delete) {
				formData.append(res + "_delete", video.files[res].id);
				changeFound = true;
			}
		} else {
			changeFound = uploadFile = true;
			formData.append(res, video.files[res]);
		}
	}

	if (changeFound) {
		if (uploadFile) {
			const { onUploadProgress, toastId } = handleProgressUpload(
				"Uploading watch video files..."
			);

			await http.post(
				`/shows/upload/watching-videos/${show_id}`,
				formData,
				{
					onUploadProgress,
				}
			);

			setTimeout(() => toast.done(toastId.current), 250);
		} else {
			await http.post(
				`/shows/upload/watching-videos/${show_id}`,
				formData
			);
		}
	}

	return Promise.resolve();
};

const onFormSubmit = async (data, callback) => {
	const { value, error } = joi.object(schema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			const { data } = await http[http_method](
				`/shows/${value.id || ""}`,
				value
			);
			toast.success("The show information have been saved!");

			// handle poster, background and square images upload process
			if (
				value.poster instanceof File ||
				value.background instanceof File ||
				(value.square_image && value.square_image instanceof File) ||
				(value.square_image && value.square_image.delete)
			) {
				await handleFileUpload(data, value);
			}

			// handle gallery images upload process
			const uploadedGalleryImages = value.gallery.filter(
				(image) => image.path
			);
			if (uploadedGalleryImages.length) {
				await handleGalleryUpload(data, uploadedGalleryImages);
			}

			// handle gallery images delete process
			const deletedGalleryImages = value.gallery.filter(
				(image) => image.delete
			);
			if (deletedGalleryImages.length) {
				await handleGalleryDelete(data, deletedGalleryImages);
			}

			// handle watching videos upload process
			if (value.watching_servers[0].files) {
				await handleWatchingVideoUpload(
					data,
					value.watching_servers[0]
				);
			}

			// handle download videos upload process
			if (
				value.video_files.some((video_file) => {
					return video_file.download_servers.some(
						(server) => server.file || server.link
					);
				})
			) {
				await handleVideosFilesUpload(data, value.video_files);
			}

			// reflect the updated show in shows list
			updateShowsList();

			return { type: ACTIONS.SUBMIT_FORM, error: null, callback };
		} catch (ex) {
			// alert the network error
			toast.error(ex.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error };
	}
};

const onFormTypeChange = (showType) => {
	return {
		type: ACTIONS.CHANGE_FORM_TYPE,
		showType: showType,
	};
};

const onWatchVideoFileDelete = (resolution) => {
	return {
		type: ACTIONS.DELETE_WATCH_VIDEO_FILE,
		resolution,
	};
};

const onWatchVideoPlayerDelete = (serverNo) => {
	return {
		type: ACTIONS.DELETE_WATCH_SERVER,
		serverNo,
	};
};

const onVideoFileDelete = (videoNo) => {
	return {
		type: ACTIONS.DELETE_VIDEO_FILE,
		videoNo,
	};
};

const onShowImageDelete = (imageField) => {
	return {
		type: ACTIONS.DELETE_SHOW_IMAGE,
		imageField,
	};
};

const onShowDataLoad = (data) => ({
	type: ACTIONS.LOAD_SHOW_DATA,
	data,
});

const onVideoLinkDelete = (videoInfoNo, serverNo) => ({
	type: ACTIONS.DELETE_VIDEO_LINK,
	videoInfoNo,
	serverNo,
});

const onVideoInfoDelete = (videoInfoNo) => ({
	type: ACTIONS.DELETE_VIDEO_INFO,
	videoInfoNo,
});

export default {
	onFormSubmit,
	onFormTypeChange,
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
	onShowImageDelete,
	onShowDataLoad,
};
