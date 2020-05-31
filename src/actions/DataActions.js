import * as ACTIONS from "./ActionTypes";

const getDataActions = (dataType) => ({
	loadData: (data) => ({
		type: ACTIONS.LOAD_DATA,
		dataType,
		data,
	}),
});

export default getDataActions;
