import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const episodesTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            category: { label: text("all_categories"), value: "" },
            author: { label: text("all_authors"), value: "" },
            status: { label: text("all_status"), value: "" },
        },
        search: { showName: { label: text("show_name"), value: "" } },
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
