import * as ACTIONS from "./ActionTypes";
import getMenuStructure from "../components/services/mainMenuServices";
import {
	sortMenu,
	deleteMenuItem,
} from "./../components/services/mainMenuServices";

const mainMenuActions = {
	deleteMenuItem(id, nestedIn) {
		return {
			type: ACTIONS.DELETE_MAIN_MENU_ITEM,
			payload: deleteMenuItem(id),
			meta: { id, nestedIn },
		};
	},

	loadMenuData() {
		return {
			type: ACTIONS.LOAD_MAIN_MENU_STRUCTURE,
			payload: getMenuStructure(),
		};
	},

	sortMenuItems(nestedIn, nestedTo, oldIndex, newIndex) {
		return {
			type: ACTIONS.SORT_MAIN_MENU_ITEMS,
			payload: sortMenu({ nestedIn, nestedTo, oldIndex, newIndex }),
		};
	},
};

export default mainMenuActions;
