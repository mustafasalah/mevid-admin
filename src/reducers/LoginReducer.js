import * as ACTIONS from "../actions/ActionTypes";

const loginReducer = (state = {}, { type, loggedUser }) => {
	if (type === ACTIONS.LOGIN_USER) {
		return loggedUser;
	}

	return state;
};

export default loginReducer;
