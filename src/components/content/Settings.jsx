import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import SectionHeader from "./../common/SectionHeader";
import FormSection from "./../common/form/FormSection";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import LogoField from "./LogoField";
import SiteBackgroundField from "./SiteBackgroundField";
import FaviconField from "./FaviconField";
import SettingsActions from "../../actions/SettingsActions";
import { upperFirst } from "../../js/Utility";
import { getAvailableLangs } from "../services/settingsServices";
import text, { isRtl } from "../../langs/lang";

const supported_social_media = [
    "facebook",
    "twitter",
    "instagram",
    "youtube",
    "pinterest",
    "linkedin",
    "reddit",
    "tiktok",
    "dribbble",
    "flickr",
    "twitch",
    "soundcloud",
    "vk",
    "telegram",
    "snapchat",
    "patreon",
];

const SaveButton = () => (
    <section className="widget save-btn">
        <button className="primary-btn focus-shadow radius">
            <i className="fas fa-save" style={{ marginRight: 3 }}></i>{" "}
            {text("save_changes")}
        </button>
    </section>
);

const Settings = ({
    data,
    onFormSubmit: onSubmit,
    onSettingsDataLoad: loadSettingsData,
}) => {
    const [langs, setLangs] = useState([]);

    // Get available languages list
    useEffect(() => {
        (async () => {
            const availableLangs = await getAvailableLangs();
            setLangs(availableLangs);
        })();
    }, []);

    return (
        <Fragment>
            <SectionHeader
                name={text("general_settings")}
                faClass="fas fa-cogs"
            />
            <form
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(data, loadSettingsData);
                }}
            >
                <div id="main-side">
                    <FormSection header={text("website_meta_information")}>
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.site_name"
                                    label={text("site_name")}
                                    type="text"
                                    placeholder={`${text("e.g.")} MEVid`}
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.home_page_title"
                                    label={text("home_page_title")}
                                    type="text"
                                    placeholder={`[${text(
                                        "site_name"
                                    )}] - [${text(
                                        "page_title_will_appear_here"
                                    )}]`}
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.keywords"
                                    label={text("keywords")}
                                    type="text"
                                    placeholder={`${text("e.g.")} ${text(
                                        "movies"
                                    )}, ${text("tv_shows")}, ${text(
                                        "anime"
                                    )}, ${text("online_watching")}...`}
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.description"
                                    label={text("site_description")}
                                    type="textarea"
                                    placeholder={`${text("e.g.")} ${text(
                                        "site_description_example"
                                    )}`}
                                    required
                                />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        header={text("general_options")}
                        faClass="fas fa-cog"
                    >
                        <div className="row">
                            <div className="col-3-1">
                                <FormField
                                    name="settings.site_content"
                                    label={text("site_content_type")}
                                    type="select"
                                    placeholder={text("select_content_types")}
                                    options={[
                                        {
                                            label: text("movies"),
                                            value: "movies",
                                        },
                                        {
                                            label: text("tv_shows"),
                                            value: "tvshows",
                                        },
                                        {
                                            label: text("anime"),
                                            value: "anime",
                                        },
                                    ]}
                                    multiple
                                    required
                                />
                            </div>
                            <div className="col-3-1">
                                <FormField
                                    name="settings.default_language"
                                    label={text("site_language")}
                                    type="select"
                                    placeholder={text("select_site_language")}
                                    options={langs}
                                    required
                                />
                            </div>
                            <div className="col-3-1">
                                <FormField
                                    name="settings.dark_mode"
                                    label={text("default_theme")}
                                    type="select"
                                    placeholder={text("select_default_theme")}
                                    options={[
                                        {
                                            label: text("light_theme"),
                                            value: 0,
                                        },
                                        {
                                            label: text("dark_theme"),
                                            value: 1,
                                        },
                                    ]}
                                    required
                                />
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.comments_enabled"
                                        label={text("comments")}
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.comments_supervisor"
                                        label={text("supervise_comments")}
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.reviews_enabled"
                                        label={text("reviews")}
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.reviews_supervisor"
                                        label={text("supervise_reviews")}
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.registeration_enabled"
                                        label={text("user_registeration")}
                                        type="radio"
                                    />
                                </div>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        header={text("external_api_configuration")}
                        faClass="fas fa-cog"
                    >
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.fb_app_id"
                                    label={text("facebook_app_id")}
                                    type="text"
                                    placeholder={`${text(
                                        "get_it_from"
                                    )} https://developers.facebook.com/apps`}
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.fb_app_secret"
                                    label={text("facebook_app_secret")}
                                    type="text"
                                    placeholder={`${text(
                                        "get_it_from"
                                    )} https://developers.facebook.com/apps`}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.tw_app_id"
                                    label={text("twitter_app_id")}
                                    type="text"
                                    placeholder={`${text(
                                        "get_it_from"
                                    )} https://apps.twitter.com/app/new`}
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.tw_app_secret"
                                    label={text("twitter_app_secret")}
                                    type="text"
                                    placeholder={`${text(
                                        "get_it_from"
                                    )} https://apps.twitter.com/app/new`}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.captcha_site_key"
                                    label={text("captcha_site_key")}
                                    type="text"
                                    placeholder="https://www.google.com/recaptcha/admin/create"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.captcha_secret_key"
                                    label={text("captcha_secret_key")}
                                    type="text"
                                    placeholder="https://www.google.com/recaptcha/admin/create"
                                />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        header={text("social_media_accounts")}
                        faClass="fas fa-share-alt"
                        closed
                    >
                        <div className="row">
                            {supported_social_media.map((social_media) => (
                                <div className="col-2" key={social_media}>
                                    <div className="row">
                                        <div className="col-4-3">
                                            <FormField
                                                name={`settings.${social_media}.url`}
                                                label={
                                                    isRtl()
                                                        ? `${text(
                                                              "a_account"
                                                          )} ${upperFirst(
                                                              social_media
                                                          )}`
                                                        : `${upperFirst(
                                                              social_media
                                                          )} ${text(
                                                              "a_account"
                                                          )}`
                                                }
                                                type="url"
                                                placeholder={`${text(
                                                    "e.g."
                                                )} https://www.${social_media}.com/mevid`}
                                            />
                                        </div>
                                        <div className="col-4-1">
                                            <FormField
                                                name={`settings.${social_media}.counter`}
                                                label={text("fans")}
                                                type="text"
                                                placeholder={`${text(
                                                    "e.g."
                                                )} 20K`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FormSection>
                </div>

                <div id="end-side">
                    <SaveButton />

                    <FormSideSection
                        label={text("site_logo")}
                        id="site-logo"
                        required
                    >
                        <LogoField />
                    </FormSideSection>

                    <FormSideSection
                        label={text("site_background")}
                        id="site-bg"
                    >
                        <SiteBackgroundField />
                    </FormSideSection>

                    <FormSideSection
                        label={text("site_favicon")}
                        id="site-favicon"
                    >
                        <FaviconField />
                    </FormSideSection>

                    <SaveButton />
                </div>
            </form>
        </Fragment>
    );
};

export default connect(
    (state) => ({ data: state.forms.settings.data }),
    SettingsActions
)(Settings);
