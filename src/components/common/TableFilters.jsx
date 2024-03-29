import React from "react";
import text from "../../langs/lang";

const TableFilters = ({ filters, filtersData, onFilter }) => {
    return (
        <div id="table-filters">
            <label>
                <span>{text("filter_items")}</span>
            </label>

            {Object.entries(filters.select).map(([filterName, filter]) => {
                return (
                    <div key={filterName} className="table-filter">
                        <select
                            value={filter.value}
                            name={`${filterName}-filter`}
                            onChange={({ currentTarget: select }) =>
                                onFilter("select", {
                                    [filterName]: {
                                        label: text(filter.label),
                                        value: select.value,
                                    },
                                })
                            }
                            className="radius-3"
                        >
                            <option value="">{text(filter.label)}</option>

                            {filtersData[filterName].map(({ label, value }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}

            {Object.entries(filters.search).map(([filterName, filter]) => (
                <div key={filterName} className="table-filter search-filter">
                    <input
                        name={`${filterName}-filter`}
                        value={filter.value}
                        onChange={({ currentTarget: search }) =>
                            onFilter("search", {
                                [filterName]: {
                                    label: text(filter.label),
                                    value: search.value,
                                },
                            })
                        }
                        type="search"
                        className="radius-3"
                        placeholder={`${text("search_by")} ${text(
                            filter.label
                        )}...`}
                    />
                </div>
            ))}
        </div>
    );
};

export default TableFilters;
