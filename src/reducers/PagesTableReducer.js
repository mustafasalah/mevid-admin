import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const pagesTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            status: {
                label: "all_status",
                value: "",
            },
        },
        search: { title: { label: "page_title", value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const pagesTableReducer = tableReducer("pages", pagesTableInitialState);

export default pagesTableReducer;
