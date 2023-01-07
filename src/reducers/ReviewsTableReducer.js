import tableReducer, { tableInitialState } from "./TableReducer";

const reviewsTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            status: {
                label: "all_status",
                value: "",
            },
            rate: {
                label: "all_rates",
                value: "",
            },
        },
        search: { showName: { label: "show_name", value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const reviewsTableReducer = tableReducer("reviews", reviewsTableInitialState);

export default reviewsTableReducer;
