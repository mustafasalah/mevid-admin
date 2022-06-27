import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";
import text from "../langs/lang";

const schedulerForm = { id: null, showId: "", day: "", time: "" };

const SchedulerReducer = (
    state = {
        schedulerForm,
        schedulers: [],
    },
    { type, ...payload }
) => {
    // handle http server errors
    if (type.startsWith("SCHEDULER") && payload.error) {
        toast.error(payload.payload.message);
        return state;
    }

    switch (type) {
        case ACTIONS.SCHEDULER_LOAD_DATA:
            if (typeof payload.meta.callback === "function")
                payload.meta.callback();

            return {
                schedulerForm: { ...state.schedulerForm },
                schedulers: [...payload.payload.data],
            };

        case ACTIONS.SCHEDULER_ADD_SHOW:
            payload = payload.payload;

            toast.success(
                text("show_has_been_added_successfully_in_scheduler")
            );

            return {
                schedulerForm,
                schedulers: [...state.schedulers, payload.data],
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
            payload = payload.payload;

            const updatedSchedulers = state.schedulers.map((scheduler) => {
                if (scheduler.id !== payload.data.id) return scheduler;
                return { ...payload.data };
            });

            toast.success(
                text("show_date_has_been_updated_successfully_in_scheduler")
            );

            return {
                schedulerForm,
                schedulers: updatedSchedulers,
            };

        case ACTIONS.SCHEDULER_DELETE_SHOW:
            payload = payload.payload;
            const filteredSchedulers = state.schedulers.filter(
                (scheduler) => scheduler.id !== payload.data.id
            );

            toast.success(
                text("show_has_been_removed_successfully_from_scheduler")
            );

            return {
                schedulerForm,
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
