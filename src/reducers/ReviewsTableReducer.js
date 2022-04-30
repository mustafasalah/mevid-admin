import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const reviewsTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            status: {
                label: text("all_status"),
                value: "",
            },
            rate: {
                label: text("all_rates"),
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

const reviewsTableReducer = tableReducer("reviews", reviewsTableInitialState);

export default reviewsTableReducer;
