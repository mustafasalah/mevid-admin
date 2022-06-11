import React, { Fragment } from "react";
import FormField from "../common/form/FormField";
import { connect } from "react-redux";
import { toFileSize } from "./../../js/Utility";
import text from "../../langs/lang";

const LogoField = ({ logo, dark_logo }) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-1 center">
                    <span className="version">{text("light_version")}</span>
                </div>
                <div className="col-1">
                    <span
                        className="image blur-shadow radius"
                        style={{
                            backgroundImage: `${
                                logo.url
                                    ? `url("${
                                          logo.url +
                                          "?r=" +
                                          new Date().getTime()
                                      }")`
                                    : "none"
                            }`,
                        }}
                    ></span>

                    <p className="note radius">{`${logo.name}${
                        logo.size ? " / " + toFileSize(logo.size) : ""
                    }`}</p>
                </div>

                <div className="col-1 center">
                    <FormField
                        type="file"
                        name="settings.logo"
                        label={text("upload_image")}
                        labelClass="primary-btn upload-btn radius focus-shadow"
                        accept="image/*"
                        unwrappedField
                        labelAfter
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-1 center">
                    <span className="version">{text("dark_version")}</span>
                </div>
                <div className="col-1">
                    <span
                        className="image blur-shadow radius"
                        style={{
                            backgroundImage: `${
                                dark_logo.url
                                    ? `url("${
                                          dark_logo.url +
                                          "?r=" +
                                          new Date().getTime()
                                      }")`
                                    : "none"
                            }`,
                        }}
                    ></span>
                    {!!dark_logo.name && (
                        <p className="note radius">{`${dark_logo.name}${
                            dark_logo.size
                                ? " / " + toFileSize(dark_logo.size)
                                : ""
                        }`}</p>
                    )}
                </div>

                <div className="col-1 center">
                    <FormField
                        type="file"
                        name="settings.dark_logo"
                        label={text("upload_image")}
                        labelClass="primary-btn upload-btn radius focus-shadow"
                        accept="image/*"
                        unwrappedField
                        labelAfter
                    />
                </div>
            </div>

            <div className="row note">
                <div className="col-1">
                    <small>
                        {text("note_recommended_image_width_to_height_ratio")}
                    </small>
                </div>
            </div>
        </Fragment>
    );
};

export default connect((state) => ({
    logo: state.forms.settings.data.logo,
    dark_logo: state.forms.settings.data.dark_logo,
}))(LogoField);
