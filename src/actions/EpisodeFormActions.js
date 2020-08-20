import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import store from "../store";
import http from "../components/services/httpServices";
import { episodeSchema } from "./ValidationSchema";
import FormActions from "./FormActions";
import {
	updateList,
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
} from "./MediaFormActions";
import { handleWatchingVideoUpload } from "./UploadHandlers";

const onFormSubmit = async (data, callback) => {
	const { value, error } = joi.object(episodeSchema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			const { data } = await http[http_method](
				`/episodes/${value.id || ""}`,
				value
			);
			toast.success("The episode information have been saved!");

			// handle watching videos upload process
			await handleWatchingVideoUpload(data, value.watching_servers[0]);

			// // handle download videos upload process
			// if (
			// 	value.video_files.some((video_file) => {
			// 		return video_file.download_servers.some(
			// 			(server) => server.file || server.link
			// 		);
			// 	})
			// ) {
			// 	await handleVideosFilesUpload(data, value.video_files);
			// }

			// reflect the updated show in shows list
			updateList("episodes");

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: null,
				callback,
				loggedUser: store.getState().loggedUser,
				formType: "episode",
			};
		} catch (ex) {
			// alert the network error
			toast.error(ex.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
				formType: "episode",
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error, formType: "episode" };
	}
};

export default {
	onFormSubmit,
	onFieldChange: FormActions.onFieldChanged("episode"),
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
};
