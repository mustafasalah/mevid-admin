import React from "react";
import { Fragment } from "react";
import FormField from "./../common/form/FormField";
import getAuthors from "./../services/authorsServices";
import { connect } from "react-redux";
import { authorize } from "./../../js/Utility";
import text from "../../langs/lang";

const PublishFields = ({
    loggedUser: { role },
    form,
    forms,
    submitLabel = "Publish",
    extraFields,
    deleteBtn,
}) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-3-1">
                    <FormField
                        label={text("status")}
                        name={`${form}.published`}
                        type="select"
                        defaultValue="publish"
                        options={[
                            { label: text("draft"), value: "0" },
                            { label: text("publish"), value: "1" },
                        ]}
                    />
                </div>

                <div className="col-3-2">
                    <FormField
                        label={text("author")}
                        name={`${form}.author`}
                        type="select"
                        options={getAuthors().map((author) => ({
                            label: author.name,
                            value: +author.id,
                        }))}
                        disabled={
                            authorize(role, "supervisor")
                                ? forms[form].data.id === ""
                                    ? true
                                    : false
                                : true
                        }
                    />
                </div>

                <div className="col-1">
                    <FormField
                        label={text("keywords")}
                        name={`${form}.keywords`}
                        type="text"
                        htmlAfterField={
                            <small>
                                {text("used_to_find_the")} {text(form)}{" "}
                                {text("in_the_search_engines")}
                            </small>
                        }
                    />
                </div>

                <div className="col-1">
                    <FormField
                        label={text("description")}
                        name={`${form}.description`}
                        type="textarea"
                        htmlAfterField={
                            <small>
                                {text("shown_in_search_engine_results_below")}{" "}
                                {text(form)}{" "}
                                {text("lang_code") === "en"
                                    ? text("title")
                                    : ""}
                            </small>
                        }
                    />
                </div>

                <div className="col-2">
                    <FormField
                        label={text("publish_date")}
                        name={`${form}.publish_date.date`}
                        className="date"
                        type="text"
                        placeholder={text("today_date")}
                        autoComplete="off"
                        dateType="date-from"
                    />
                </div>

                <div className="col-2">
                    <FormField
                        label={text("publish_time")}
                        name={`${form}.publish_date.time`}
                        className="time"
                        type="text"
                        placeholder={text("current_time")}
                    />
                </div>

                {extraFields &&
                    extraFields.map((field, i) => (
                        <div key={i} className="col-1">
                            {field}
                        </div>
                    ))}
            </div>

            <button type="submit" className="primary-btn focus-shadow radius">
                {submitLabel}
            </button>

            {deleteBtn && (
                <button
                    type="button"
                    className="delete-btn dark-btn focus-shadow radius"
                    onClick={() => deleteBtn.handler()}
                >
                    {deleteBtn.label || text("delete")}
                </button>
            )}
        </Fragment>
    );
};

export default connect((state) => ({
    loggedUser: state.loggedUser,
    forms: state.forms,
}))(PublishFields);
