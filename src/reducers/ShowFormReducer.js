import * as ACTIONS from "../actions/ActionTypes";
import {
	getNestedProperty,
	setNestedProperty,
	deepCopy,
} from "./../js/Utility";
import initialState, { listItemsDefaults } from "./InitialShowState";

const showFormReducer = (state = initialState, { type, ...payload }) => {
	let newState;

	switch (type) {
		case ACTIONS.DELETE_VIDEO_INFO:
			return {
				errors: state.errors,
				data: {
					...state.data,
					video_files: state.data.video_files.map((video_file, i) => {
						if (i === payload.videoInfoNo) {
							video_file.delete = true;
						}
						return video_file;
					}),
				},
			};

		case ACTIONS.DELETE_VIDEO_LINK:
			return {
				errors: state.errors,
				data: {
					...state.data,
					video_files: state.data.video_files.map((video_file, i) => {
						if (i !== payload.videoInfoNo) return video_file;
						return {
							...video_file,
							download_servers: video_file.download_servers.map(
								(server, i) => {
									if (i === payload.serverNo) {
										server.delete = true;
									}
									return server;
								}
							),
						};
					}),
				},
			};

		case ACTIONS.DELETE_WATCH_SERVER:
			return {
				errors: state.errors,
				data: {
					...state.data,
					watching_servers: state.data.watching_servers.filter(
						(server, i) => i !== payload.serverNo
					),
				},
			};

		case ACTIONS.DELETE_GALLERY_IMAGE:
			return {
				errors: state.errors,
				data: {
					...state.data,
					gallery: state.data.gallery.map((img, i) => {
						if (i === payload.imageIndex) {
							img.delete = true;
						}
						return img;
					}),
				},
			};

		case ACTIONS.LOAD_SHOW_DATA:
			const showData = { ...initialState.data, ...payload.data };

			if (showData.watching_servers.length === 0) {
				showData.watching_servers = initialState.data.watching_servers;
			} else {
				const haveFilesField = showData.watching_servers.some(
					(server) => server.files !== undefined
				);

				const havePlayerField = showData.watching_servers.some(
					(server) => server.code !== undefined
				);

				if (!haveFilesField) {
					showData.watching_servers.unshift(
						initialState.data.watching_servers[0]
					);
				}

				if (!havePlayerField) {
					showData.watching_servers.push(
						initialState.data.watching_servers[1]
					);
				}
			}

			if (showData.video_files.length === 0) {
				showData.video_files = initialState.data.video_files;
			}

			return {
				errors: state.errors,
				data: showData,
			};

		case ACTIONS.DELETE_SHOW_IMAGE:
			const { imageField } = payload;
			const deletedImage = state.data[imageField];
			deletedImage.delete = true;

			return {
				errors: state.errors,
				data: { ...state.data, [imageField]: deletedImage },
			};

		case ACTIONS.DELETE_VIDEO_FILE:
			newState = deepCopy(state);
			newState.data.video_files[
				payload.videoNo
			].download_servers[0].file = null;
			return newState;

		case ACTIONS.DELETE_WATCH_VIDEO_FILE:
			newState = deepCopy(state);
			newState.data.watching_servers[0].files[
				payload.resolution
			].delete = true;
			return newState;

		case ACTIONS.CHANGE_FORM_TYPE:
			return {
				errors: { ...initialState.errors },
				data: { ...initialState.data, type: payload.showType },
			};

		case ACTIONS.SUBMIT_FORM:
			const { error } = payload;
			if (error && error.details) {
				newState = deepCopy(state);
				const fieldName = error.details[0].context.key;
				if (fieldName in newState.data) {
					newState["errors"][fieldName] = error.details[0];
				}
				return newState;
			}
			return state;

		case ACTIONS.FORM_ADD:
			let { error: fieldError, fieldName, fieldValue } = payload;
			newState = deepCopy(state);
			newState["errors"][fieldName] = fieldError && fieldError.details[0];
			if (fieldName === "gallery")
				fieldValue = newState.data.gallery
					.filter((img) => img.url)
					.concat(fieldValue);
			setNestedProperty(newState.data, fieldName, fieldValue);
			return newState;

		case ACTIONS.FORM_ADD_ITEM_LIST:
			const { formName, listName } = payload;

			if (formName === "show") {
				newState = { errors: state.errors, data: deepCopy(state.data) };
				setNestedProperty(newState.data, listName, [
					...getNestedProperty(newState.data, listName),
					{
						...listItemsDefaults[listName.replace(/\.\d*\./g, ".")],
					},
				]);
				return newState;
			}
			return state;

		case ACTIONS.DELETE_ARC:
			const { key } = payload;

			// Get a Copy of the state
			newState = {
				errors: state.errors,
				data: deepCopy(state.data),
			};

			// Delete Arc from Arcs List
			newState.data.arcs.list = newState.data.arcs.list.filter(
				(arc) => arc.key !== key
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
			newState.data.arcs.form = { id: "", key: "", no: "", name: "" };

			if (data.key === "") {
				// Add Arc Logic
				data.key = newState.data.arcs.list.length;
				newState.data.arcs.list = [...state.data.arcs.list, data];
			} else {
				// Update Arc Logic
				newState.data.arcs.list = state.data.arcs.list.map((arc) => {
					if (arc.key === data.key) return data;
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

		default:
			return state;
	}
};

export default showFormReducer;
