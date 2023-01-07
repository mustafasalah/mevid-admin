import tableReducer, { tableInitialState } from "./TableReducer";

const showsTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            genres: { label: "all_genres", value: "" },
            author: { label: "all_authors", value: "" },
            status: { label: "all_status", value: "" },
        },
        search: { name: { label: "show_name", value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const showsTableReducer = (tableName) =>
    tableReducer(tableName, showsTableInitialState);

export default showsTableReducer;
