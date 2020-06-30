import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";

const types = ["shows", "episodes", "comments", "reviews", "pages", "users"];

const dataReducer = (dataType) => (state = [], { type, ...rest }) => {
	if (type === ACTIONS.LOAD_APP_DATA) {
		const { status, value, reason } = rest.payload[types.indexOf(dataType)];

		if (status === "fulfilled") {
			return value;
		} else {
			toast.error(reason.message + " in loading " + dataType + " data");
			return state;
		}
	}

	switch (type) {
		case ACTIONS.LOAD_DATA:
			if (dataType !== rest.dataType) return state;
			return rest.data;

		default:
			return state;
	}
};

export default dataReducer;
