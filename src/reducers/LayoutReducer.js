import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";

const layoutReducer = (layoutType) => (
	state = [],
	{ type, payload, error, dropzone, oldIndex, newIndex, meta }
) => {
	switch (type) {
		case ACTIONS.ADD_WIDGET_TO_LAYOUT:
			if (error && payload) {
				toast.error(
					payload.message + " in adding new widget to layout"
				);
				return state;
			}

			const { position, widgetType } = meta;

			if (position !== layoutType) return state;

			// alert success message
			toast.success(
				`New ${widgetType} widget has been added to ${position} section successfully!`
			);

			return [...state, payload.data];

		case ACTIONS.UPDATE_LAYOUT_WIDGET_DATA:
			if (error && payload) {
				toast.error(
					payload.message + " in updating layout widget data"
				);
				return state;
			}

			if (payload.data.position !== layoutType) return state;
			delete payload.data.position;

			// alert success message
			toast.success(`The widget data has been successfully updated!`);

			return state.map((widget) => {
				if (widget.id === payload.data.id) return payload.data;
				return widget;
			});

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
