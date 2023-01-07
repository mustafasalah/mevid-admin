import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const RecentWidget = ({ onSubmit }) => (
    <FormSideSection
        label={text("recent_added")}
        id="recent-added"
        submitBtn={onSubmit}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={text("default_recent_added")}
                />
            </div>

            <div className="col-2">
                <FormField
                    name="layout.settings.shows_no"
                    label={text("shows_per_page")}
                    type="number"
                    placeholder={`${text("default")}: 10`}
                    min="5"
                />
            </div>

            <div className="col-2">
                <FormField
                    name="layout.enabled"
                    label={text("enabled")}
                    type="radio"
                />
            </div>
        </div>
    </FormSideSection>
);

export default RecentWidget;
