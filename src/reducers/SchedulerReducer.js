import * as ACTIONS from "../actions/ActionTypes";

const SchedulerReducer = (
	state = {
		schedulerForm: { id: null, showId: "", day: "", time: "" },
		schedulers: [],
	},
	{ type, ...payload }
) => {
	switch (type) {
		case ACTIONS.SCHEDULER_ADD_SHOW:
			return {
				schedulerForm: payload,
				schedulers: [...state.schedulers, payload],
			};

		case ACTIONS.SCHEDULER_UPDATE_SHOW:
			return {
				schedulerForm: {
					...state.schedulers.find(
						(scheduler) => scheduler.id === payload.id
					),
				},
				schedulers: state.schedulers,
			};

		case ACTIONS.SCHEDULER_UPDATED_SHOW:
			const updatedSchedulers = state.schedulers.map((scheduler) => {
				if (scheduler.id !== payload.id) return scheduler;
				return { ...scheduler, ...payload };
			});

			return {
				schedulerForm: state.schedulerForm,
				schedulers: updatedSchedulers,
			};

		case ACTIONS.SCHEDULER_DELETE_SHOW:
			const filteredSchedulers = state.schedulers.filter(
				(scheduler) => scheduler.id !== payload.id
			);
			return {
				schedulerForm: state.schedulerForm,
				schedulers: filteredSchedulers,
			};

		case ACTIONS.SCHEDULER_UPDATE_FIELD:
			const { fieldType, data } = payload;
			const updatedSchedulerForm = { ...state.schedulerForm };

			if (Array.isArray(fieldType)) {
				for (let type of fieldType) {
					updatedSchedulerForm[type] = data[type];
				}
			} else {
				updatedSchedulerForm[fieldType] = data;
			}

			return {
				schedulerForm: updatedSchedulerForm,
				schedulers: state.schedulers,
			};

		default:
			return state;
	}
};

export default SchedulerReducer;
