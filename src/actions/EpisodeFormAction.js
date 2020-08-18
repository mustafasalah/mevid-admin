import React from "react";
import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "../components/services/httpServices";
import { episodeschema as schema } from "./ValidationSchema";
import FormActions from "./FormActions";

// const updateShowsList = async () => {
// 	const shows = await getShows();

// 	store.dispatch({
// 		type: ACTIONS.LOAD_DATA,
// 		dataType: "shows",
// 		data: shows,
// 	});
// };

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

export default {
	onFormSubmit,
	onFieldChange: FormActions.onFieldChanged("episode"),
};
