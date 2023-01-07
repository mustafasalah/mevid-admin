import React from "react";
import text from "../../langs/lang";

const LinkForm = ({ form, onSubmit, onChange }) => {
    const { id, label, url } = form;
    const isUpdate = id !== null;
    const isFilled = label !== "" && url !== "";

    return (
        <div className="field">
            <label htmlFor="link-name">
                {isUpdate ? text("update_link") : text("add_link")}
            </label>
            <div className="row radius" id="nested-form">
                <div className="col-1">
                    <div className="field">
                        <label htmlFor="link-name">{text("link_label")}</label>
                        <input
                            id="link-name"
                            name="link-name"
                            type="text"
                            value={label}
                            placeholder={`${text("e.g.")} ${text(
                                "terms_of_use"
                            )}`}
                            onChange={({ currentTarget: input }) => {
                                onChange("label", input.value);
                            }}
                        />
                    </div>
                </div>
                <div className="col-1">
                    <div className="field">
                        <label htmlFor="link-url">{text("link_url")}</label>
                        <input
                            id="link-url"
                            name="link-url"
                            type="url"
                            value={url}
                            placeholder={`${text(
                                "e.g."
                            )} http://www.mevid.com/terms-of-use`}
                            onChange={({ currentTarget: input }) => {
                                onChange("url", input.value);
                            }}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    id="links-list-button"
                    className="dark-btn radius-3 focus-shadow"
                    disabled={!isFilled}
                    onClick={() => isFilled && onSubmit(form, isUpdate)}
                >
                    {isUpdate ? text("update_link") : text("add_link")}
                </button>
            </div>
        </div>
    );
};

export default LinkForm;
