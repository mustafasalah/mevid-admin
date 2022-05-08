import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SectionHeader from "../common/SectionHeader";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import countires from "./../services/getCountries";
import FormSideSection from "./../common/form/FormSideSection";
import AvatarField from "./AvatarField";
import UserFormActions from "../../actions/UserFormActions";
import getUsers from "../services/usersServices";
import text from "../../langs/lang";

const UserForm = ({
    data,
    loggedUser,
    onFormSubmit: onSubmit,
    onFormReset: onReset,
    onUserDataLoad,
}) => {
    const history = useHistory();
    const params = useParams();
    const userId = params.id && Number(params.id);

    useEffect(() => {
        (async () => {
            // To reset form fields to its default value
            // (if the user edit user and then go to new one this will delete edited user state)
            if (userId === undefined) return onReset();

            // loading user data from server side and set it in form state
            try {
                const userData = await getUsers(userId);
                onUserDataLoad(userData);
            } catch (ex) {
                toast.error(
                    `${text("there_is_no_user_with_this_id")} ${userId}`,
                    {
                        autoClose: 2500,
                        onClose: () => history.goBack(),
                    }
                );
            }
        })();
    }, []);

    return (
        <Fragment>
            <SectionHeader
                name={`${userId ? text("edit_user") : text("new_user")}`}
                faClass={`fas ${userId ? "fa-edit" : "fa-user-plus"}`}
            />
            <form
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(data, () => {
                        history.push("/users/");
                    });
                }}
            >
                <div id="main-side">
                    <FormSection header={text("user_information")}>
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="user.username"
                                    label={text("username")}
                                    type="text"
                                    placeholder={`e.g. mustafa`}
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.email"
                                    label={text("email")}
                                    type="email"
                                    placeholder={`e.g. example@mail.com`}
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.password"
                                    label={text("password")}
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.confirm_password"
                                    label={text("confirm_password")}
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.first_name"
                                    label={text("first_name")}
                                    type="text"
                                    placeholder={`e.g. Mustafa`}
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.last_name"
                                    label={text("last_name")}
                                    type="text"
                                    placeholder={`e.g. Salah`}
                                />
                            </div>
                            <div className="col-2">
                                <div className="row">
                                    <div className="col-2">
                                        <FormField
                                            name="user.gender"
                                            label={text("gender")}
                                            type="select"
                                            placeholder={text("select_gender")}
                                            options={[
                                                {
                                                    label: text("male"),
                                                    value: "m",
                                                },
                                                {
                                                    label: text("female"),
                                                    value: "f",
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <FormField
                                            name="user.age"
                                            label={text("age")}
                                            type="number"
                                            min={10}
                                            max={100}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.country"
                                    label={text("country")}
                                    type="select"
                                    placeholder={text("select_country")}
                                    options={countires}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <FormField
                                    name="user.about"
                                    label={text("about")}
                                    type="textarea"
                                    placeholder={text(
                                        "something_about_user_here"
                                    )}
                                />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        header={text("social_media_accounts")}
                        faClass="fas fa-share-alt"
                    >
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="user.social_accounts.facebook"
                                    label={text("facebook_account")}
                                    type="url"
                                    placeholder="e.g. https://www.facebook.com/mevid"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.social_accounts.twitter"
                                    label={text("twitter_account")}
                                    type="url"
                                    placeholder="e.g. https://www.twitter.com/mevid"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.social_accounts.instagram"
                                    label={text("instagram_account")}
                                    type="url"
                                    placeholder="e.g. https://www.instagram.com/mevid"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="user.social_accounts.youtube"
                                    label={text("youtube_account")}
                                    type="url"
                                    placeholder="e.g. https://www.youtube.com/mevid"
                                />
                            </div>
                        </div>
                    </FormSection>
                </div>
                <div id="end-side">
                    <FormSideSection label={text("avatar")} id="user-avatar">
                        <div className="row">
                            <AvatarField />
                        </div>
                    </FormSideSection>

                    <FormSideSection
                        label={text("account_settings")}
                        id="user-options"
                    >
                        <div className="row">
                            <div className="col-1">
                                <FormField
                                    name="user.role"
                                    label={text("account_role")}
                                    type="select"
                                    disabled={
                                        userId === 1 || loggedUser.id === userId
                                    }
                                    options={[
                                        { label: text("user"), value: "user" },
                                        {
                                            label: text("publisher"),
                                            value: "publisher",
                                        },
                                        {
                                            label: text("supervisor"),
                                            value: "supervisor",
                                        },
                                        {
                                            label: text("admin"),
                                            value: "admin",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="col-1">
                                <FormField
                                    name="user.email_verification"
                                    label={text("email_verification")}
                                    type="select"
                                    options={[
                                        { label: text("verified"), value: "1" },
                                        {
                                            label: text("not_verified"),
                                            value: "0",
                                        },
                                    ]}
                                />
                            </div>

                            {userId !== undefined &&
                                userId !== loggedUser.id &&
                                userId !== 1 && (
                                    <div className="col-1">
                                        <FormField
                                            name="user.banned"
                                            label={text("account_status")}
                                            type="select"
                                            options={[
                                                {
                                                    label: text("active"),
                                                    value: "0",
                                                },
                                                {
                                                    label: text("banned"),
                                                    value: "1",
                                                },
                                            ]}
                                        />
                                    </div>
                                )}
                        </div>

                        <button
                            type="submit"
                            className="primary-btn focus-shadow radius"
                        >
                            {userId ? text("update_user") : text("create_user")}
                        </button>
                    </FormSideSection>
                </div>
            </form>
        </Fragment>
    );
};

export default connect(
    (state) => ({ data: state.forms.user.data, loggedUser: state.loggedUser }),
    UserFormActions
)(UserForm);
