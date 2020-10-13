import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";

const layoutReducer = (layoutType) => (
	state = [],
	{ type, payload, error, dropzone, oldIndex, newIndex }
) => {
	switch (type) {
		case ACTIONS.LOAD_LAYOUT:
			if (error && payload) {
				toast.error(payload.message + " in loading site layout data");
				return state;
			}
			return payload.data[layoutType];

		case ACTIONS.SORT_LAYOUT:
			if (dropzone !== layoutType) return state;
			// copy old state
			const newState = [...state];

			// swap old layout items
			const temp = newState[oldIndex];
			newState[oldIndex] = newState[newIndex];
			newState[newIndex] = temp;
			return newState;

		default:
			return state;
	}
};

export default layoutReducer;
