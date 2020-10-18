import * as ACTIONS from "./ActionTypes";
import getLayout from "./../components/services/layoutServices";
import http from "./../components/services/httpServices";

const layoutActions = {
	loadLayoutData() {
		return {
			type: ACTIONS.LOAD_LAYOUT,
			payload: getLayout(),
		};
	},

	async updateLayoutWidget(data) {
		return {
			type: ACTIONS.UPDATE_LAYOUT_WIDGET_DATA,
			payload: await http.put("/layout", data),
		};
	},

	async addWidget(position, type) {
		return {
			type: ACTIONS.ADD_WIDGET_TO_LAYOUT,
			payload: await http.post("/layout", {
				position,
				type,
			}),
			meta: {
				position,
				widgetType: type,
			},
		};
	},

	sortLayout(dropzone, oldIndex, newIndex) {
		return {
			type: ACTIONS.SORT_LAYOUT,
			dropzone,
			oldIndex,
			newIndex,
		};
	},
};

export default layoutActions;
