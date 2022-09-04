import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const episodesTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            category: { label: "all_categories", value: "" },
            author: { label: "all_authors", value: "" },
            status: { label: "all_status", value: "" },
        },
        search: { showName: { label: "show_name", value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const episodesTableReducer = tableReducer(
    "episodes",
    episodesTableInitialState
);

export default episodesTableReducer;
