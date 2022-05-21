import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const SearchWidget = ({ onSubmit }) => (
    <FormSideSection
        label={text("advance_search")}
        id="advance-search"
        submitBtn={onSubmit}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={`${text("default")}: ${text(
                        "advance_search"
                    )}`}
                />
            </div>
            <div className="col-1">
                <FormField
                    name="layout.enabled"
                    label={text("enabled")}
                    type="radio"
                    htmlAfterField={
                        <small>
                            {text(
                                "enable_or_disable_advance_search_in_the_home_page"
                            )}
                        </small>
                    }
                />
            </div>
        </div>
    </FormSideSection>
);

export default SearchWidget;
