import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const AboutWidget = ({ onSubmit }) => (
    <FormSideSection
        label={text("about_us")}
        id="about-us"
        submitBtn={onSubmit}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={`${text("default")}: ${text("about_us")}`}
                />
            </div>
            <div className="col-1">
                <FormField
                    name="layout.settings.content"
                    label={text("content")}
                    type="textarea"
                    placeholder={text("enter_something_about_website")}
                />
            </div>
            <div className="col-1">
                <FormField
                    name="layout.enabled"
                    label={text("enabled")}
                    type="radio"
                    htmlAfterField={
                        <small>
                            {text("enable_or_disable_about_us_in_the_footer")}
                        </small>
                    }
                />
            </div>
        </div>
    </FormSideSection>
);

export default AboutWidget;
