import React, { Fragment } from "react";
import { connect } from "react-redux";
import SectionHeader from "./../common/SectionHeader";
import FormSection from "./../common/form/FormSection";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import LogoField from "./LogoField";
import SiteBackgroundField from "./SiteBackgroundField";
import FaviconField from "./FaviconField";
import SettingsActions from "../../actions/SettingsActions";

const Settings = () => {
	return (
		<Fragment>
			<SectionHeader name="General Settings" faClass="fas fa-cogs" />
			<form>
				<div id="main-side">
					<FormSection header="Website Meta Information">
						<div className="row">
							<div className="col-2">
								<FormField
									name="settings.site_name"
									label="Site Name"
									type="text"
									placeholder="e.g. MEVid"
									required
								/>
							</div>
							<div className="col-2">
								<FormField
									name="settings.home_page_title"
									label="Home Page Title"
									type="text"
									placeholder="[site-name] - [page title will appear here...]"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="settings.keywords"
									label="Keywords"
									type="text"
									placeholder="e.g. Movies, TV Shows, Anime, online watching..."
								/>
							</div>
							<div className="col-2">
								<FormField
									name="settings.description"
									label="Site Description"
									type="textarea"
									placeholder="eg. MEVid for watching and downloading Movies, anime and TV Show as you want, With different resolution and Quality!"
								/>
							</div>
						</div>
					</FormSection>

					<FormSection header="General Options" faClass="fas fa-cog">
						<div className="row">
							<div className="col-3-1">
								<FormField
									name="settings.site_content"
									label="Site Content Type"
									type="select"
									placeholder="Select content types"
									options={[
										{
											label: "Movies",
											value: "movies",
										},
										{
											label: "TV Shows",
											value: "tvshows",
										},
										{
											label: "Anime",
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
									label="Default Language"
									type="select"
									placeholder="Select Default Language"
									options={[
										{
											label: "English",
											value: "en",
										},
										{
											label: "Arabic",
											value: "ar",
										},
									]}
									required
								/>
							</div>
							<div className="col-3-1">
								<FormField
									name="settings.dark_mode"
									label="Default Theme"
									type="select"
									placeholder="Select Default Theme"
									options={[
										{
											label: "Light Theme",
											value: 0,
										},
										{
											label: "Dark Theme",
											value: 1,
										},
									]}
									required
								/>
							</div>
							<div className="col-4">
								<div className="field">
									<FormField
										name="settings.comments_enabled"
										label="Comments"
										type="radio"
									/>
								</div>
							</div>
							<div className="col-4">
								<div className="field">
									<FormField
										name="settings.reviews_enabled"
										label="Reviews"
										type="radio"
									/>
								</div>
							</div>
							<div className="col-4">
								<div className="field">
									<FormField
										name="settings.comments_supervisor"
										label="Supervise Comments"
										type="radio"
									/>
								</div>
							</div>
							<div className="col-4">
								<div className="field">
									<FormField
										name="settings.reviews_supervisor"
										label="Supervise Reviews"
										type="radio"
									/>
								</div>
							</div>
							<div className="col-4">
								<div className="field">
									<FormField
										name="settings.registeration_enabled"
										label="User Registeration"
										type="radio"
									/>
								</div>
							</div>
						</div>
					</FormSection>

					<FormSection
						header="External Api Configuration"
						faClass="fas fa-cog"
					>
						<div className="row">
							<div className="col-2">
								<FormField
									name="settings.fb_app_id"
									label="Facebook App ID"
									type="text"
									placeholder="Get it from : https://www.facebook.com/app"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="settings.fb_app_secret"
									label="Facebook App Secret"
									type="text"
									placeholder="Get it from : https://www.facebook.com/app"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-2">
								<FormField
									name="settings.tw_app_id"
									label="Twitter App ID"
									type="text"
									placeholder="Get it from : https://www.twitter.com/app"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="settings.tw_app_secret"
									label="Twitter App Secret"
									type="text"
									placeholder="Get it from : https://www.twitter.com/app"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-2">
								<FormField
									name="settings.captcha_site_key"
									label="Captcha Site Key"
									type="text"
									placeholder="From: https://google.com/recaptcha/admin/create"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="settings.captcha_secret_key"
									label="Captcha Secret Key"
									type="text"
									placeholder="From: https://google.com/recaptcha/admin/create"
								/>
							</div>
						</div>
					</FormSection>

					<FormSection
						header="Social Media Accounts"
						faClass="fas fa-share-alt"
					>
						<div className="row">
							<div className="col-2">
								<div className="row">
									<div className="col-4-3">
										<FormField
											name="settings.facebook.url"
											label="Facebook Account"
											type="url"
											placeholder="e.g. https://www.facebook.com/mevid"
										/>
									</div>
									<div className="col-4-1">
										<FormField
											name="settings.facebook.counter"
											label="Likes"
											type="text"
											placeholder="e.g. 20K"
										/>
									</div>
								</div>
							</div>
							<div className="col-2">
								<div className="row">
									<div className="col-4-3">
										<FormField
											name="settings.twitter.url"
											label="Twitter Account"
											type="url"
											placeholder="e.g. https://www.twitter.com/mevid"
										/>
									</div>
									<div className="col-4-1">
										<FormField
											name="settings.twitter.counter"
											label="Followers"
											type="text"
											placeholder="e.g. 20K"
										/>
									</div>
								</div>
							</div>
							<div className="col-2">
								<div className="row">
									<div className="col-4-3">
										<FormField
											name="settings.instagram.url"
											label="Instagram Account"
											type="url"
											placeholder="e.g. https://www.instagram.com/mevid"
										/>
									</div>
									<div className="col-4-1">
										<FormField
											name="settings.instagram.counter"
											label="Followers"
											type="text"
											placeholder="e.g. 20K"
										/>
									</div>
								</div>
							</div>
							<div className="col-2">
								<div className="row">
									<div className="col-4-3">
										<FormField
											name="settings.youtube.url"
											label="YouTube Channel"
											type="url"
											placeholder="e.g. https://www.youtube.com/mevid"
										/>
									</div>
									<div className="col-4-1">
										<FormField
											name="settings.youtube.counter"
											label="Subscribers"
											type="text"
											placeholder="e.g. 20K"
										/>
									</div>
								</div>
							</div>
						</div>
					</FormSection>
				</div>

				<div id="end-side">
					<FormSideSection label="Site Logo" id="site-logo" required>
						<LogoField />
					</FormSideSection>

					<FormSideSection label="Site Background" id="site-bg">
						<SiteBackgroundField />
					</FormSideSection>

					<FormSideSection label="Site Favicon" id="site-favicon">
						<FaviconField />
					</FormSideSection>

					<section className="widget save-btn">
						<button className="primary-btn focus-shadow radius">
							<i className="fas fa-save"></i> Save Changes
						</button>
					</section>
				</div>
			</form>
		</Fragment>
	);
};

export default connect(null, SettingsActions)(Settings);
