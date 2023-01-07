import React, { Fragment } from "react";
import { itemsPerPageList } from "../../configs.json";
import text from "../../langs/lang";

const TableItemsPerPage = ({ value, onItemsPerPageChange }) => {
    return (
        <Fragment>
            <label htmlFor="items-per-page">{text("items_per_page")}</label>
            <select
                name="items-no"
                value={value}
                onChange={({ currentTarget: input }) =>
                    onItemsPerPageChange(input.value)
                }
                className="radius-3"
                id="items-per-page"
            >
                {itemsPerPageList.map((pagesNo) => (
                    <option key={pagesNo} value={pagesNo}>
                        {pagesNo}
                    </option>
                ))}
            </select>
        </Fragment>
    );
};

export default TableItemsPerPage;
