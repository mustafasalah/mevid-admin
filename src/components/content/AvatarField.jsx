import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";
import text from "../../langs/lang";
import FormField from "../common/form/FormField";

const AvatarField = ({ avatar, dispatch }) => {
    const haveAvatar = avatar && avatar.url;
    return (
        <Fragment>
            <div className="col-3-1">
                <span
                    id="avatar-image-preview"
                    className={`image blur-shadow radius${
                        haveAvatar ? "" : " empty"
                    }`}
                    style={{
                        backgroundImage: `${
                            haveAvatar ? "url('" + avatar.url + "')" : "none"
                        }`,
                    }}
                ></span>
            </div>
            <div className="col-3-2">
                <div className="avatar-image-btns">
                    {haveAvatar || avatar instanceof File ? (
                        <Fragment>
                            <p
                                className="note radius"
                                style={{ marginTop: 0, marginBottom: 15 }}
                            >
                                {avatar.name +
                                    (avatar.size
                                        ? ` / ${
                                              (avatar.size / 1e6).toFixed(2) +
                                              ` ${text("mb")}`
                                          }`
                                        : "")}
                            </p>
                            <button
                                className="dark-btn delete-btn radius focus-shadow"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const deleteIt = window.confirm(
                                        text(
                                            "are_you_sure_to_delete_this_avatar_image"
                                        )
                                    );
                                    deleteIt &&
                                        dispatch({
                                            type: ACTIONS.DELETE_USER_AVATAR,
                                            formType: "user",
                                        });
                                }}
                            >
                                {text("delete_profile_image")}
                            </button>
                        </Fragment>
                    ) : (
                        <FormField
                            type="file"
                            name="user.avatar"
                            label={text("upload_image")}
                            labelClass="primary-btn upload-btn radius focus-shadow"
                            accept="image/*"
                            unwrappedField
                            labelAfter
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default connect((state) => ({ avatar: state.forms.user.data.avatar }))(
    AvatarField
);
