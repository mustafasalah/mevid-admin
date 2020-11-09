import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import getMenuStructure from "../components/services/mainMenuServices";
import {
	deleteMenuItem,
	sortMenu,
} from "./../components/services/mainMenuServices";
import { deepCopy } from "./../js/Utility";
import { submitMenuItem } from "../components/services/mainMenuServices";
import { menuSchema } from "./ValidationSchema";
import { subMenuSchema } from "./ValidationSchema";
import { toast } from "react-toastify";
import store from "./../store";

const getMenuType = ({ nested_in }) => {
	return nested_in === undefined ? "mainmenu" : "submenu";
};

const mainMenuActions = {
	reflectMenuChanges(item, isUpdate) {
		return {
			type: ACTIONS.UPDATE_MENU_ITEMS,
			item,
			isUpdate,
		};
	},

	submitMenuItem: async (item) => {
		const { value, error } = joi
			.object(item.nested_in === undefined ? menuSchema : subMenuSchema)
			.validate(item);
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
					formType: getMenuType(item),
					donotResetFields: ["nested_in"],
				};
			} catch (ex) {
				// alert the network error
				toast.error(ex.message);
				console.log(ex);
				return {
					type: ACTIONS.SUBMIT_FORM,
					error: ex,
					formType: getMenuType(item),
					donotResetFields: ["nested_in"],
				};
			}
		} else {
			// alert the validation error
			toast.error(error.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error,
				formType: getMenuType(item),
				donotResetFields: ["nested_in"],
			};
		}
	},

	editMenuItem(item) {
		return {
			type: ACTIONS.EDIT_MAIN_MENU_ITEM,
			item,
			formType: "mainmenu",
		};
	},

	editSubMenu(id) {
		return {
			type: ACTIONS.EDIT_SUB_MENU,
			formType: "submenu",
			id,
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
		let menu = deepCopy(store.getState().mainmenu);

		console.log("old: ", menu);

		if (nestedIn === nestedTo) {
			if (nestedIn === null) {
				let counterA = 0,
					counterB = 0;

				for (let i = oldIndex - 1; i >= 0; i--) {
					if (menu[i] === undefined) {
						continue;
					}
					for (let j = 0; j < menu[i].nested.length; j++) {
						counterA++;
					}
				}

				for (let i = newIndex - 1; i >= 0; i--) {
					debugger;
					if (menu[i] === undefined) {
						continue;
					}
					for (let j = 0; j < menu[i].nested.length; j++) {
						counterB++;
					}
				}

				oldIndex = oldIndex - counterA;
				newIndex = newIndex - counterB;

				// const temp = menu[oldIndex];
				// menu.splice(oldIndex, 1, menu[newIndex]);
				// menu[newIndex] = temp;
			}
			// else {
			// 	menu = menu.map((item) => {
			// 		if (item.id === nestedIn) {
			// 			const temp = item.nested[oldIndex];
			// 			item.nested[oldIndex] = item.nested[newIndex];
			// 			item.nested[newIndex] = temp;
			// 		}
			// 		return item;
			// 	});
			// }
		} else if (nestedIn === null) {
			// Create temporary variable to hold moved item
			let counter = 0;

			for (let i = oldIndex - 1; i >= 0; i--) {
				if (menu[i] === undefined) continue;
				for (let j = 0; j < menu[i].nested.length; j++) {
					counter++;
				}
			}
			oldIndex = oldIndex - counter;

			// const temp = menu[oldIndex];

			// // Delete moved item from main menu
			// menu = menu.filter((item, i) => {
			// 	console.log(i, oldIndex);
			// 	return i !== oldIndex;
			// });

			// // Insert moved item into it's sub menu
			// menu = menu.map((item) => {
			// 	if (item.id == nestedTo) {
			// 		item.nested[newIndex] = temp;
			// 	}
			// 	return item;
			// });
		} else if (nestedTo === null) {
			newIndex = menu.length;
			debugger;
		}

		console.log(oldIndex, newIndex);

		return {
			type: ACTIONS.SORT_MAIN_MENU_ITEMS,
			payload: sortMenu(nestedIn, nestedTo, oldIndex, newIndex),
		};
	},
};

export default mainMenuActions;
