import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";
import { deepCopy } from "./../js/Utility";

const mainMenuReducer = (
	state = [],
	{ type, error, payload, meta, isUpdate, item }
) => {
	switch (type) {
		case ACTIONS.UPDATE_MENU_ITEMS:
			if (isUpdate) {
				if (item.nested_in === undefined) {
					return [...state].map((menuItem) => {
						if (menuItem.id === item.id) return item;
						return menuItem;
					});
				} else {
					return [...state].map((menuItem) => {
						if (menuItem.id === item.nested_in) {
							return {
								...menuItem,
								nested: menuItem.nested.map((nestedItem) => {
									if (nestedItem.id === item.id) return item;
									return nestedItem;
								}),
							};
						}
						return menuItem;
					});
				}
			}

			return [...state, item];

		case ACTIONS.DELETE_MAIN_MENU_ITEM:
			if (error && payload) {
				toast.error(payload.message + " when deleting menu item");
				return state;
			}
			const newState = deepCopy(state);
			if (meta.nestedIn !== undefined) {
				const res = newState.map((item) => {
					if (item.id === meta.nestedIn) {
						return {
							...item,
							nested: item.nested.filter(
								(nestedItem) => nestedItem.id !== meta.id
							),
						};
					}
					return item;
				});
				return res;
			}

			// alert success message
			toast.success("The menu item has been deleted successfully");

			return newState.filter((item) => item.id !== meta.id);

		case ACTIONS.SORT_MAIN_MENU_ITEMS:
			if (error && payload) {
				toast.error(payload.message + " when sorting main menu items");
			}
			return state;

		case ACTIONS.LOAD_MAIN_MENU_STRUCTURE:
			if (error && payload) {
				toast.error(payload.message + " when loading main menu data");
				return state;
			}
			return payload.data;

		default:
			return state;
	}
};

export default mainMenuReducer;
