import * as ACTIONS from "./ActionTypes";
import { schema, nestedSchema } from "./ValidationSchema";

const onFieldChanged = (formType) => (fieldName, fieldValue) => {
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
};
