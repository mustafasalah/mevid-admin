import React, { useState } from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import LinkForm from "../content/LinkForm";
import LinksList from "../content/LinksList";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";
import text from "../../langs/lang";

const LinksListWidget = ({ onSubmit, links, dispatch }) => {
    const [form, setForm] = useState({
        id: null,
        label: "",
        url: "",
    });

    const moveLinkHandler = (index, direction) => {
        if (
            (index <= 0 && direction === "up") ||
            (index >= links.length - 1 && direction === "down")
        ) {
            return;
        }

        // change the form index when the moved link is in editing mode
        if (index === form.id) {
            setForm({
                ...form,
                id: direction === "up" ? index - 1 : index + 1,
            });
        }

        dispatch({
            type: ACTIONS.MOVE_LINK_IN_LINKS_LIST_WIDGET,
            index,
            direction,
            formType: "layout",
        });
    };

    const submitLinkHandler = (link, isUpdate) => {
        dispatch({
            type: isUpdate
                ? ACTIONS.UPDATE_LINK_IN_LINKS_LIST_WIDGET
                : ACTIONS.ADD_LINK_IN_LINKS_LIST_WIDGET,
            link,
            formType: "layout",
        });

        // Reset form fields
        setForm({ id: null, label: "", url: "" });
    };

    const deleteLinkHandler = (index) => {
        // if the deleted link is in editing mode then remove it from editing form
        if (index === form.id) {
            setForm({
                id: null,
                label: "",
                url: "",
            });
        }

        dispatch({
            type: ACTIONS.DELETE_LINK_IN_LINKS_LIST_WIDGET,
            index,
            formType: "layout",
        });
    };

    const changeHandler = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const editLinkHandler = (link, index) => {
        setForm({
            id: index,
            ...link,
        });
    };

    return (
        <FormSideSection
            label={text("links_list")}
            id="links-list"
            submitBtn={onSubmit}
        >
            <div className="row">
                <div className="col-1">
                    <FormField
                        name="layout.title"
                        label={text("title")}
                        type="text"
                        placeholder={`${text("default")}: ${text(
                            "important_links"
                        )}`}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-1">
                    <LinkForm
                        form={form}
                        onChange={changeHandler}
                        onSubmit={submitLinkHandler}
                    />
                </div>

                <div className="col-1">
                    <LinksList
                        links={links}
                        onMove={moveLinkHandler}
                        onEdit={editLinkHandler}
                        onDelete={deleteLinkHandler}
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
                                    "enable_or_disable_links_list_in_the_footer"
                                )}
                            </small>
                        }
                    />
                </div>
            </div>
        </FormSideSection>
    );
};

export default connect()(LinksListWidget);
