import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const usersTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            status: {
                label: text("all_status"),
                value: "",
            },
            role: {
                label: text("all_roles"),
                value: "",
            },
        },
        search: { username: { label: text("username"), value: "" } },
    },
    sortColumn: {
        column: "id",
        order: "desc",
    },
};

const usersTableReducer = tableReducer("users", usersTableInitialState);

export default usersTableReducer;
