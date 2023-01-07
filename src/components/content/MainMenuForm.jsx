import React from "react";
import FormSideSection from "../common/form/FormSideSection";
import FormField from "../common/form/FormField";
import { connect } from "react-redux";
import FormActions from "../../actions/FormActions";
import mainMenuActions from "./../../actions/MainMenuActions";
import SubMenuItems from "./SubMenuItems";
import text from "../../langs/lang";
import LinkField from "../common/form/LinkField";

const MainMenuForm = ({
    form,
    mainmenu,
    pages,
    siteContent,
    onReset,
    onSubmit,
}) => {
    const isUpdate = form.id !== "";

    return (
        <FormSideSection
            label={isUpdate ? text("update_menu_item") : text("add_menu_item")}
            submitBtn={{
                label: isUpdate ? text("update") : text("add_to_menu"),
                handler: () => {
                    onSubmit(form);
                },
            }}
            deleteBtn={
                isUpdate
                    ? {
                          label: text("cancel"),
                          handler: () => onReset(),
                      }
                    : undefined
            }
            extraContent={
                isUpdate ? (
                    <SubMenuItems
                        links={
                            mainmenu.find((item) => item.id === form.id).nested
                        }
                    />
                ) : undefined
            }
        >
            <div className="row">
                <div className="col-1">
                    <FormField
                        name="mainmenu.label"
                        label={text("link_label")}
                        type="text"
                        placeholder={`${text("e.g.")} ${text("scheduler")}`}
                    />
                </div>

                <div className="col-1">
                    <FormField
                        name="mainmenu.type"
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
                        placeholder={text("select_link_type")}
                    />
                </div>

                <div className="col-1">
                    <LinkField
                        pages={pages}
                        siteContent={siteContent}
                        form={form}
                    />
                </div>
            </div>
        </FormSideSection>
    );
};

export default connect(
    (state) => ({
        pages: state.pages,
        siteContent: state.forms.settings.data.site_content,
        form: state.forms.mainmenu.data,
        mainmenu: state.mainmenu,
    }),
    {
        onReset: FormActions.onFormReset("mainmenu"),
        onSubmit: mainMenuActions.submitMenuItem,
    }
)(MainMenuForm);
