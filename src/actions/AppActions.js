import * as ACTIONS from "./ActionTypes";

export const appActions = {
	onUserLogin: (loggedUser) => ({
		type: ACTIONS.LOGIN_USER,
		loggedUser,
	}),

	loadAppData: (appData) => {
		return { type: ACTIONS.LOAD_APP_DATA, appData };
	},
};
