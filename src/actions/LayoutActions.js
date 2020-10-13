import * as ACTIONS from "./ActionTypes";
import getLayout from "./../components/services/layoutServices";

const layoutActions = {
	loadLayoutData() {
		return {
			type: ACTIONS.LOAD_LAYOUT,
			payload: getLayout(),
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
