import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import getMenuStructure from "../components/services/mainMenuServices";
import {
	sortMenu,
	deleteMenuItem,
} from "./../components/services/mainMenuServices";
import { submitMenuItem } from "../components/services/mainMenuServices";
import { menuSchema } from "./ValidationSchema";
import { toast } from "react-toastify";
import store from "./../store";

const mainMenuActions = {
	reflectMenuChanges(item, isUpdate) {
		return {
			type: ACTIONS.UPDATE_MENU_ITEMS,
			item,
			isUpdate,
		};
	},

	submitMenuItem: async (item) => {
		const { value, error } = joi.object(menuSchema).validate(item);
		const isUpdate = item.id !== "";

		if (!error) {
			try {
				// Send submit request to server
				const { data } = await submitMenuItem(value);

				// alert success message
				if (isUpdate) {
					toast.success(
						"The menu item has been updated successfully"
					);
				} else {
					toast.success(
						"The new menu item has been added successfully"
					);
				}

				// reflect menu items changes in main menu structure
				store.dispatch(
					mainMenuActions.reflectMenuChanges(data, isUpdate)
				);

				return {
					type: ACTIONS.SUBMIT_FORM,
					error: null,
					formType: "mainmenu",
				};
			} catch (ex) {
				// alert the network error
				toast.error(ex.message);
				return {
					type: ACTIONS.SUBMIT_FORM,
					error: ex,
					formType: "mainmenu",
				};
			}
		} else {
			// alert the validation error
			toast.error(error.message);
			return { type: ACTIONS.SUBMIT_FORM, error, formType: "mainmenu" };
		}
	},

	editMenuItem(item) {
		return {
			type: ACTIONS.EDIT_MAIN_MENU_ITEM,
			item,
			formType: "mainmenu",
		};
	},

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
