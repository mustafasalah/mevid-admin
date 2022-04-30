import text from "../langs/lang";
import tableReducer, { tableInitialState } from "./TableReducer";

const showsTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            genres: { label: text("all_genres"), value: "" },
            author: { label: text("all_authors"), value: "" },
            status: { label: text("all_status"), value: "" },
        },
        search: { name: { label: text("show_name"), value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const showsTableReducer = (tableName) =>
    tableReducer(tableName, showsTableInitialState);

export default showsTableReducer;
