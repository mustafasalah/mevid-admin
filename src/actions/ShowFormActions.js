import React from "react";
import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "./../components/services/httpServices";
import { schema, nestedSchema } from "./ValidationSchema";

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

	value.poster && formData.append("poster_image", value.poster);

	value.background && formData.append("background_image", value.background);

	value.square_image && formData.append("square_image", value.square_image);

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

	if (toastId.current) {
		toast.done(toastId.current);
	} else {
		setTimeout(() => toast.done(toastId.current), 250);
	}

	return Promise.resolve();
};

const handleVideosFilesUpload = async ({ show_id, name }, videosFiles) => {
	const formData = new FormData();
	let fileUploadFound = false;

	formData.append("show_name", name);

	for (let videoFile of videosFiles) {
		formData.append("videos_info[]", JSON.stringify(videoFile));
		if ("file" in videoFile.download_servers[0]) {
			fileUploadFound = true;
			formData.append(
				"videos_files[]",
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

		toast.done(toastId.current);

		return Promise.resolve();
	}

	return http.post(`/shows/upload/videos/${show_id}`, formData);
};

const handleWatchingVideoUpload = async ({ show_id, name }, video) => {
	const formData = new FormData();

	formData.append("show_name", name);
	formData.append("server_name", video.name);

	for (let res in video.files) {
		formData.append(res, video.files[res]);
	}

	const { onUploadProgress, toastId } = handleProgressUpload(
		"Uploading watch video files..."
	);

	await http.post(`/shows/upload/watching-videos/${show_id}`, formData, {
		onUploadProgress,
	});

	toast.done(toastId.current);

	return Promise.resolve();
};

const onFormSubmit = async (data) => {
	const { value, error } = joi.object(schema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			const res = await http[http_method](`/shows/`, value);
			toast.success("The show information have been saved!");

			// handle poster, background and square images upload process
			await handleFileUpload(res.data, value);

			// handle gallery images upload process
			if (value.gallery.length) {
				await handleGalleryUpload(res.data, value.gallery);
			}

			// handle watching videos upload process
			if ("files" in value.watching_servers[0]) {
				await handleWatchingVideoUpload(
					res.data,
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
				await handleVideosFilesUpload(res.data, value.video_files);
			}
			return { type: ACTIONS.SUBMIT_FORM, error: null };
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

const onFieldChanged = (fieldName, fieldValue) => {
	let value, error;

	const validateKey = fieldName.replace(/\d+\.?/g, "").replace(/\./g, "_");

	if (
		!(fieldValue instanceof File) &&
		!validateKey.match(
			/^(watching_servers|video_files_download_servers_file)/
		)
	) {
		({ value, error } = { ...schema, ...nestedSchema }[
			validateKey
		].validate(fieldValue));
	} else {
		value = fieldValue;
	}

	return {
		type: ACTIONS.FORM_ADD,
		fieldName,
		fieldValue: value === undefined ? "" : value,
		error,
	};
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
	onFieldChanged,
	onFormTypeChange,
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
	onShowImageDelete,
	onShowDataLoad,
};
