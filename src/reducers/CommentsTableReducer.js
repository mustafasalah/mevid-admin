import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const commentsTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            status: {
                label: text("all_status"),
                value: "",
            },
        },
        search: { showName: { label: text("show_name"), value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const commentsTableReducer = tableReducer(
    "comments",
    commentsTableInitialState
);

export default commentsTableReducer;
