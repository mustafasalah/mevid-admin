import * as ACTIONS from "../actions/ActionTypes";
import {
	getNestedProperty,
	setNestedProperty,
	deepCopy,
} from "./../js/Utility";

const initialState = {
	data: {
		name: "",
		genres: [],
		release_year: "",
		score: "",
		rate: "nr",
		duration: "",
		season_no: "",
		episodes_no: "",
		status: "a",
		source_type: "manga",
		studios: "n/a",
		related_shows: [],
		release_date: "",
		aired_from: "",
		aired_to: "",
		story: "",
		imdb_url: "",
		mal_url: "",
		poster: "",
		background: "",
		square_image: "",
		trailer_url: "",
		tags: [],
		publish_status: 1,
		author: "",
		keywords: "",
		description: "",
		watching_servers: [
			{ name: "", code: "" },
			{ name: "", code: "" },
		],
		video_files: [
			{
				raw_type: "blu-ray",
				resolution: "1080",
				size: "",
				audio: "aac",
				language: "",
				subtitle: "",
				translater: "",
				download_servers: [{ name: "", link: "" }],
			},
		],
	},
	errors: {},
};

const showFormReducer = (state = initialState, { type, ...payload }) => {
	let newState;

	switch (type) {
		case ACTIONS.FORM_ADD:
			const { error, fieldName, fieldValue } = payload;
			newState = deepCopy(state);
			newState["errors"][fieldName] = error && error.details[0];
			setNestedProperty(newState.data, fieldName, fieldValue);
			return newState;

		case ACTIONS.FORM_ADD_ITEM_LIST:
			const { formName, listName } = payload;
			if (formName === "show") {
				newState = { errors: state.errors, data: deepCopy(state.data) };

				setNestedProperty(newState.data, listName, [
					...getNestedProperty(newState.data, listName),
					{
						...getNestedProperty(
							initialState.data,
							`${listName}.0`
						),
					},
				]);
				return newState;
			}
			return state;

		default:
			return state;
	}
};

export default showFormReducer;
