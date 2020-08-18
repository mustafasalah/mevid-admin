import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";
import { deepCopy } from "./../js/Utility";

const types = ["shows", "episodes", "comments", "reviews", "pages", "users"];

const dataReducer = (dataType) => (state = [], { type, ...rest }) => {
	switch (type) {
		case ACTIONS.CHANGE_STATUS:
			let { meta } = rest;
			if (dataType !== meta.dataType) return state;

			if (rest.error) {
				toast.error(rest.payload.message);
				return state;
			}

			toast.success(
				`The status of the selected ${meta.dataType} has been successfully changed!`
			);
			return state.map((data) => {
				if (meta.id.indexOf(data.id) !== -1) {
					data = deepCopy(data);
					data.status = meta.status;
				}
				return data;
			});

		case ACTIONS.DELETE_DATA:
			if (dataType !== rest.meta.dataType) return state;
			let {
				meta: { id, dataType: typeName },
			} = rest;

			if (rest.error) {
				toast.error(rest.payload.message);
				return state;
			} else {
				if (id instanceof Array) {
					toast.success(
						`The selected ${typeName} were deleted successfully!`
					);
					return state.filter((data) => {
						return id.indexOf(data.id) === -1;
					});
				} else {
					toast.success(
						`The ${typeName.slice(0, -1)} was deleted successfully!`
					);
					return state.filter((data) => data.id !== id);
				}
			}

		case ACTIONS.LOAD_APP_DATA:
			const { status, value, reason } = rest.payload[
				types.indexOf(dataType)
			];

			if (status === "fulfilled") {
				return value;
			} else {
				toast.error(
					reason.message + " in loading " + dataType + " data"
				);
				return state;
			}

		case ACTIONS.LOAD_DATA:
			if (dataType !== rest.dataType) return state;
			return rest.data;

		default:
			return state;
	}
};

export default dataReducer;
