import React from "react";
import FormField from "../common/form/FormField";
import { connect } from "react-redux";
import mainMenuActions from "./../../actions/MainMenuActions";
import text from "../../langs/lang";
import LinkField from "../common/form/LinkField";

const subMenuForm = ({ form, siteContent, pages, onSubmit }) => {
    const { id, label, url } = form;
    const isUpdate = id !== "";
    const isFilled = label !== "" && url !== "";

    return (
        <div className="field">
            <label htmlFor="link-name">
                {isUpdate ? text("update_sub_link") : text("add_sub_link")}
            </label>
            <div className="row radius" id="nested-form">
                <div className="col-1">
                    <FormField
                        name="submenu.label"
                        label={text("link_label")}
                        type="text"
                    />
                </div>

                <div className="col-1">
                    <FormField
                        name="submenu.type"
                        label={text("link_type")}
                        type="select"
                        options={[
                            { label: text("custom_link"), value: "link" },
                            {
                                label: text("a_category"),
                                value: "category",
                            },
                            { label: text("genre"), value: "genre" },
                            { label: text("a_page"), value: "page" },
                            { label: text("a_tag"), value: "tag" },
                        ]}
                    />
                </div>

                <div className="col-1">
                    <LinkField
                        pages={pages}
                        siteContent={siteContent}
                        form={form}
                    />
                </div>
                <button
                    type="button"
                    id="links-list-button"
                    className="dark-btn radius-3 focus-shadow"
                    disabled={!isFilled}
                    onClick={() => isFilled && onSubmit(form)}
                >
                    {isUpdate ? text("update_link") : text("add_link")}
                </button>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({
        pages: state.pages,
        form: state.forms.submenu.data,
        siteContent: state.forms.settings.data.site_content,
    }),
    {
        onSubmit: mainMenuActions.submitMenuItem,
    }
)(subMenuForm);
