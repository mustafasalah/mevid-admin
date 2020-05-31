import React, { Component, Fragment } from "react";
import SectionHeader from "./../common/SectionHeader";
import Select from "./../common/form/Select";

class Settings extends Component {
	state = {};
	render() {
		return (
			<Fragment>
				<SectionHeader name="General Settings" faClass="fas fa-cogs" />
				<form method="POST">
					<div id="main-side">
						<section className="widget form">
							<h3 className="radius blur-shadow">
								<span>
									<i className="fas fa-info-circle"></i>
									Website Meta Information
								</span>
							</h3>
							<div className="widget-content radius">
								<div className="row">
									<div className="col-2">
										<div className="field">
											<label htmlFor="site-name">
												Site Name
											</label>
											<input
												id="site-name"
												name="site-name"
												type="text"
												placeholder="e.g. MEVid"
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="homepage-title">
												Home Page Title
											</label>
											<input
												id="homepage-title"
												name="homepage-title"
												type="text"
												placeholder="[site-name] - [page title will appear here...]"
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="keywords">
												Keywords
											</label>
											<input
												id="keywords"
												name="keywords"
												type="text"
												placeholder="e.g. Movies, TV Shows, Anime, online watching..."
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="description">
												Site Description
											</label>
											<textarea
												id="description"
												name="description"
												placeholder="eg. MEVid for watching and downloading Movies, anime and TV Show as you want, With different resolution and Quality!"
											></textarea>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="fb-app-id">
												Facebook App ID
											</label>
											<input
												id="fb-app-id"
												name="fb-app-id"
												type="text"
												placeholder="Get it from : https://www.facebook.com/app"
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="fb-app-id">
												Twitter App ID
											</label>
											<input
												id="tw-app-id"
												name="tw-app-id"
												type="text"
												placeholder="Get it from : https://www.twitter.com/app"
											/>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className="widget form">
							<h3 className="blur-shadow radius">
								<span>
									<i className="fas fa-cog"></i>
									General Options
								</span>
							</h3>
							<div className="widget-content radius">
								<div className="row">
									<div className="col-3-2">
										<div className="field">
											<label htmlFor="site-content">
												Site Content Type
											</label>
											<Select
												id="site-content"
												name="site-content"
												isMulti
												options={[
													{
														label: "Movies",
														value: "movies",
													},
													{
														label: "Anime",
														value: "anime",
													},
													{
														label: "TV Shows",
														value: "tv-shows",
													},
												]}
												defaultValue={[
													{
														label: "Movies",
														value: "movies",
													},
													{
														label: "Anime",
														value: "anime",
													},
													{
														label: "TV Shows",
														value: "tv-shows",
													},
												]}
											/>
										</div>
									</div>
									<div className="col-3-1">
										<div className="row">
											<div className="col-2">
												<div className="field">
													<label htmlFor="comments-enabled">
														Comments
													</label>
													<input
														id="comments-enabled"
														name="comments-enabled"
														type="checkbox"
														checked
													/>
													<label
														htmlFor="comments-enabled"
														className="switch-btn"
													></label>
												</div>
											</div>
											<div className="col-2">
												<div className="field">
													<label htmlFor="">
														Reviews
													</label>
													<input
														id="reviews-enabled"
														name="reviews-enabled"
														type="checkbox"
														checked
													/>
													<label
														htmlFor="reviews-enabled"
														className="switch-btn"
													></label>
												</div>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="field">
											<label htmlFor="default-mode">
												Default Theme
											</label>
											<Select
												name="default-mode"
												id="default-mode"
												isSearchable={false}
												defaultValue={{
													label: "Light Mode",
													value: "light",
												}}
												options={[
													{
														label: "Light Mode",
														value: "light",
													},
													{
														label: "Dark Mode",
														value: "dark",
													},
												]}
											/>
										</div>
									</div>
									<div className="col-4">
										<div className="field">
											<label htmlFor="comments-review">
												Supervise Comments
											</label>
											<input
												id="comments-review"
												name="comments-review"
												type="checkbox"
												checked
											/>
											<label
												htmlFor="comments-review"
												className="switch-btn"
											></label>
										</div>
									</div>
									<div className="col-4">
										<div className="field">
											<label htmlFor="reviews-review">
												Supervise Reviews
											</label>
											<input
												id="reviews-review"
												name="reviews-review"
												type="checkbox"
												checked
											/>
											<label
												htmlFor="reviews-review"
												className="switch-btn"
											></label>
										</div>
									</div>
									<div className="col-4">
										<div className="field">
											<label htmlFor="users-register">
												User Registeration
											</label>
											<input
												id="users-register"
												name="users-register"
												type="checkbox"
												checked
											/>
											<label
												htmlFor="users-register"
												className="switch-btn"
											></label>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className="widget form">
							<h3 className="blur-shadow radius">
								<span>
									<i className="fas fa-share-alt"></i>
									Social Media Accounts
								</span>
							</h3>
							<div className="widget-content radius">
								<div className="row">
									<div className="col-2">
										<div className="field">
											<label htmlFor="facebook-account">
												Facebook Account
											</label>
											<input
												id="facebook-account"
												name="facebook-account"
												type="url"
												placeholder="e.g. https://www.facebook.com/mevid"
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="twitter-account">
												Twitter Account
											</label>
											<input
												id="twitter-account"
												name="twitter-account"
												type="url"
												placeholder="e.g. https://www.twitter.com/mevid"
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="instagram-account">
												Instagram Account
											</label>
											<input
												name="instagram-account"
												id="instagram-account"
												type="url"
												placeholder="e.g. https://www.instagram.com/mevid"
											/>
										</div>
									</div>
									<div className="col-2">
										<div className="field">
											<label htmlFor="youtube-channel">
												YouTube Channel
											</label>
											<input
												name="youtube-channel"
												id="youtube-channel"
												type="url"
												placeholder="e.g. https://www.youtube.com/mevid"
											/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<div id="end-side">
						<section className="widget form radius" id="site-logo">
							<h3>
								<span>Site Logo</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1 center">
										<span className="version">
											Light Version
										</span>
									</div>
									<div className="col-1">
										<span className="image blur-shadow radius"></span>
									</div>
									<div className="col-1 center">
										<input
											type="file"
											id="light-logo-image"
											name="light-logo-image"
										/>
										<label
											htmlFor="light-logo-image"
											className="dark-btn upload-btn radius focus-shadow"
										>
											Upload Logo
										</label>
									</div>
								</div>

								<div className="row">
									<div className="col-1 center">
										<span className="version">
											Dark Version
										</span>
									</div>
									<div className="col-1">
										<span className="image blur-shadow radius"></span>
									</div>
									<div className="col-1 center">
										<input
											type="file"
											id="dark-logo-image"
											name="dark-logo-image"
										/>
										<label
											htmlFor="dark-logo-image"
											className="dark-btn upload-btn radius focus-shadow"
										>
											Upload Logo
										</label>
									</div>
								</div>

								<div className="row note">
									<div className="col-1">
										<small>
											Note: recommended image width to
											height ratio is 225:100
										</small>
									</div>
								</div>
							</div>
						</section>

						<section className="widget form radius" id="site-bg">
							<h3>
								<span>Site Background</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1 center">
										<span className="version">
											Light Version
										</span>
									</div>
									<div className="col-5-1">
										<span className="image blur-shadow radius light-bg"></span>
									</div>
									<div className="col-5-4">
										<div id="favicon-btns">
											<input
												type="file"
												id="avatar-image"
												name="avatar-image"
											/>
											<label
												htmlFor="avatar-image"
												className="dark-btn upload-btn radius focus-shadow"
											>
												Upload Image
											</label>
											<a
												href="#"
												className="primary-btn delete-btn radius focus-shadow"
											>
												Delete
											</a>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-1 center">
										<span className="version">
											Dark Version
										</span>
									</div>
									<div className="col-5-1">
										<span className="image blur-shadow radius dark-bg"></span>
									</div>
									<div className="col-5-4">
										<div id="favicon-btns">
											<input
												type="file"
												id="avatar-image"
												name="avatar-image"
											/>
											<label
												htmlFor="avatar-image"
												className="dark-btn upload-btn radius focus-shadow"
											>
												Upload Image
											</label>
											<a
												href="#"
												className="primary-btn delete-btn radius focus-shadow"
											>
												Delete
											</a>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section
							className="widget form radius"
							id="site-favicon"
						>
							<h3>
								<span>Site Favicon</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-5-1">
										<span className="image blur-shadow radius"></span>
									</div>
									<div className="col-5-4">
										<div id="favicon-btns">
											<input
												type="file"
												id="avatar-image"
												name="avatar-image"
											/>
											<label
												htmlFor="avatar-image"
												className="dark-btn upload-btn radius focus-shadow"
											>
												Upload Image
											</label>
											<a
												href="#"
												className="primary-btn delete-btn radius focus-shadow"
											>
												Delete
											</a>
										</div>
									</div>
								</div>
								<div className="row note">
									<div className="col-1">
										<small>
											Note: Image ratio is 1:1 and
											supported formats are (.ico, .png or
											.gif)
										</small>
									</div>
								</div>
							</div>
						</section>

						<section className="widget save-btn">
							<button className="primary-btn focus-shadow radius">
								Save Changes
							</button>
						</section>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default Settings;
