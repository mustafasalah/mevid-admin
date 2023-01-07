import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const AdsWidget = ({ onSubmit, onDelete }) => (
    <FormSideSection
        label={text("ads")}
        id="ads"
        submitBtn={onSubmit}
        deleteBtn={onDelete}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.settings.content"
                    label={text("html_code")}
                    type="textarea"
                    placeholder={text("html_code_here")}
                />
            </div>

            {onDelete === undefined && (
                <div className="col-1">
                    <FormField
                        name="layout.enabled"
                        label={text("enabled")}
                        type="radio"
                        htmlAfterField={
                            <small>
                                {text("enable_or_disable_viewing_ads")}
                            </small>
                        }
                    />
                </div>
            )}
        </div>
    </FormSideSection>
);

export default AdsWidget;
