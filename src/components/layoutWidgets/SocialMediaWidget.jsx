import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const SocialMediaWidget = ({ onSubmit }) => (
    <FormSideSection
        label={text("follow_us")}
        id="social-media"
        submitBtn={onSubmit}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={text("default_follow_us")}
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
                                "social_media_links_can_be_added_in_general_settings"
                            )}
                        </small>
                    }
                />
            </div>
        </div>
    </FormSideSection>
);

export default SocialMediaWidget;
