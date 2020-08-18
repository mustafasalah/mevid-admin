import * as ACTIONS from "./ActionTypes";
import http from "./../components/services/httpServices";

const mapStatus = new Map([
	["publish", "published"],
	["draft", "drafted"],
]);

const getDataActions = (dataType) => ({
	loadData: (data) => ({
		type: ACTIONS.LOAD_DATA,
		dataType,
		data,
	}),

	changeStatus: (id, status) => ({
		type: ACTIONS.CHANGE_STATUS,
		payload: http.put(`/${dataType}/`, {
			shows_id: id,
			status: status,
		}),
		meta: {
			id,
			status: mapStatus.get(status),
			dataType,
		},
	}),

	deleteData: (id) => {
		let payload;
		if (id instanceof Array) {
			payload = http.delete(`/${dataType}/`, {
				data: {
					deleted_shows_id: id,
				},
			});
		} else {
			payload = http.delete(`/${dataType}/${id}`);
		}

		return {
			type: ACTIONS.DELETE_DATA,
			payload,
			meta: { id, dataType },
		};
	},
});

export default getDataActions;
