import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const AccountWidget = ({ onSubmit }) => (
    <FormSideSection label={text("account")} id="account" submitBtn={onSubmit}>
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={`${text("default")}: ${text("account")}`}
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
                                "enable_or_disable_account_links_in_the_footer"
                            )}
                        </small>
                    }
                />
            </div>
        </div>
    </FormSideSection>
);

export default AccountWidget;
