import * as ACTIONS from "../actions/ActionTypes";

const dataReducer = (dataType) => (state = [], { type, ...payload }) => {
	if (type === ACTIONS.LOAD_APP_DATA) {
		return payload.appData[dataType];
	}

	if (dataType !== payload.dataType) return state;

	switch (type) {
		case ACTIONS.LOAD_DATA:
			return payload.data;

		default:
			return state;
	}
};

export default dataReducer;
