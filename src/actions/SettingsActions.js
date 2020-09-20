import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "../components/services/httpServices";
import { settingsSchema } from "./ValidationSchema";
import FormActions from "./FormActions";
import getSettings from "../components/services/settingsServices";

const onFormSubmit = async (data, callback) => {
	const { value, error } = joi.object(settingsSchema).validate(data);

	if (!error) {
		try {
			await http.put(`/settings/`, value);
			toast.success("The new settings have been saved!");

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: null,
				callback,
				formType: "settings",
			};
		} catch (ex) {
			// alert the network error
			toast.error(ex.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
				formType: "settings",
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error, formType: "settings" };
	}
};

const onSettingsDataLoad = async () => ({
	type: ACTIONS.LOAD_SETTINGS_DATA,
	payload: getSettings(),
	meta: {
		formType: "settings",
	},
});

const onImageDelete = (imageType) => ({
	type: ACTIONS.DELETE_APP_IMAGE,
	imageType,
	formType: "settings",
});

export default {
	onFormSubmit,
	onFieldChange: FormActions.onFieldChanged("episode"),
	onSettingsDataLoad,
	onImageDelete,
};
