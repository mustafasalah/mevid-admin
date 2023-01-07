import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const SchedulerWidget = ({ onSubmit }) => (
    <FormSideSection
        label={text("today_schedule")}
        id="today-schedule"
        submitBtn={onSubmit}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={`${text("default")}: ${text(
                        "today_schedule"
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
                                "enable_or_disable_today_schedule_in_the_home_page"
                            )}
                        </small>
                    }
                />
            </div>
        </div>
    </FormSideSection>
);

export default SchedulerWidget;
