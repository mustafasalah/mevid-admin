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
		author: "mustafa_salah",
		keywords: "",
		description: "",
		arcs: {
			form: {
				id: "",
				no: "",
				name: "",
			},
			list: [],
		},
		watching_servers: [
			{ name: "", code: "" },
			{ name: "", code: "" },
		],
		video_files: [
			{
				raw_type: "blu-ray",
				resolution: "1080",
				size: "",
				audio: "AAC",
				language: "",
				subtitle: "",
				translater: "",
				download_servers: [
					{ name: "", link: "" },
					{ name: "", link: "" },
				],
			},
		],
	},
	errors: {},
};

const showFormReducer = (state = initialState, { type, ...payload }) => {
	let newState;

	switch (type) {
		case ACTIONS.SUBMIT_FORM:
			const { error } = payload;
			return state;

		case ACTIONS.DELETE_ARC:
			const { arc_id } = payload;

			// Get a Copy of the state
			newState = {
				errors: state.errors,
				data: deepCopy(state.data),
			};

			// Delete Arc from Arcs List
			newState.data.arcs.list = newState.data.arcs.list.filter(
				(arc) => arc.id !== arc_id
			);

			return newState;

		case ACTIONS.UPDATE_ARC:
			const { data } = payload;

			// Get a Copy of the state
			newState = {
				errors: state.errors,
				data: deepCopy(state.data),
			};

			// Reset Arc Form Fields
			newState.data.arcs.form = { id: "", no: "", name: "" };

			if (data.id === "") {
				// Add Arc Logic
				data.id = Math.round(Math.random() * 100);
				newState.data.arcs.list = [...state.data.arcs.list, data];
			} else {
				// Update Arc Logic
				newState.data.arcs.list = state.data.arcs.list.map((arc) => {
					if (arc.id === data.id) return data;
					return arc;
				});
			}

			return newState;

		case ACTIONS.EDIT_ARC:
			const { arc_data } = payload;
			return {
				errors: state.errors,
				data: {
					...state.data,
					arcs: { ...state.data.arcs, form: arc_data },
				},
			};

		case ACTIONS.FORM_ADD:
			const { error: fieldError, fieldName, fieldValue } = payload;
			newState = deepCopy(state);
			newState["errors"][fieldName] = fieldError && fieldError.details[0];
			setNestedProperty(newState.data, fieldName, fieldValue);
			return newState;

		case ACTIONS.FORM_ADD_ITEM_LIST:
			const { formName, listName } = payload;
			if (formName === "show") {
				newState = { errors: state.errors, data: deepCopy(state.data) };
				console.log(listName);
				setNestedProperty(newState.data, listName, [
					...getNestedProperty(newState.data, listName),
					{
						...getNestedProperty(
							initialState.data,
							`${listName.replace(/\.[1-9][0-9]*\./g, ".0.")}.0`
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
