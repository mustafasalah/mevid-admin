import * as ACTIONS from "./ActionTypes";

const SchedulerActions = {
	onShowAdded(showId, day, time) {
		return {
			type: ACTIONS.SCHEDULER_ADD_SHOW,
			id: Math.trunc(Math.random() * 1000),
			showId: Number(showId),
			day,
			time,
		};
	},

	onFieldUpdate(fieldType, data) {
		return {
			type: ACTIONS.SCHEDULER_UPDATE_FIELD,
			fieldType,
			data,
		};
	},

	onShowUpdated(id, day, time) {
		return {
			type: ACTIONS.SCHEDULER_UPDATED_SHOW,
			id: Number(id),
			day,
			time,
		};
	},

	onShowUpdate(id) {
		return {
			type: ACTIONS.SCHEDULER_UPDATE_SHOW,
			id: Number(id),
		};
	},

	onShowDeleted(id) {
		return {
			type: ACTIONS.SCHEDULER_DELETE_SHOW,
			id: Number(id),
		};
	},
};

export default SchedulerActions;
