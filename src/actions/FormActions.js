import * as ACTIONS from "./ActionTypes";
import store from "../store";
import { schema, nestedSchema, pageSchema } from "./ValidationSchema";
import getEpisodes from "../components/services/episodesServices";
import getShows from "../components/services/showsServices";
import getPages from "../components/services/pagesServices";
import getUsers from "../components/services/usersServices";

const updateList = async (listType) => {
	let items;

	switch (listType) {
		case "shows":
			items = await getShows();
			break;

		case "episodes":
			items = await getEpisodes();
			break;

		case "pages":
			items = await getPages();
			break;

		case "users":
			items = await getUsers();
			break;

		default:
			items = [];
	}

	store.dispatch({
		type: ACTIONS.LOAD_DATA,
		dataType: listType,
		data: items,
	});
};

const onFieldChanged = (formType) => (fieldName, fieldValue) => {
	let value, error;
	let validateKey = fieldName.replace(/\d+\.?/g, "").replace(/\./g, "_");

	if (
		!(fieldValue instanceof File) &&
		!validateKey.match(
			/^(watching_servers|video_files_download_servers_file)/
		)
	) {
		if (formType === "page") {
			({ value, error } = { ...pageSchema, ...nestedSchema }[
				validateKey
			].validate(fieldValue));
		} else {
			const validationSchema = { ...schema, ...nestedSchema };

			if (validateKey === "confirm_password") {
				if (store.getState().forms.user.data.password !== fieldValue) {
					error = {
						details: [
							{
								message:
									"The confirm password doesn't match the password",
							},
						],
					};
				}
				value = fieldValue;
			} else {
				({ value, error } = validationSchema[validateKey].validate(
					fieldValue
				));
			}
		}
	} else {
		value = fieldValue;
	}

	return {
		type: ACTIONS.FORM_ADD,
		fieldName,
		fieldValue: value === undefined ? "" : value,
		formType,
		error,
	};
};

const onFormReset = (formType) => () => ({
	type: ACTIONS.RESET_FORM,
	formType,
});

export default {
	onFieldChanged,
	onFormReset,
	updateList,
};
