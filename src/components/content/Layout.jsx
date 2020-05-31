import React, { Component, Fragment } from "react";
import SectionHeader from "./../common/SectionHeader";
import LinksList from "../../js/LinksList";
import runSortable from "../../js/Sortable";

class Layout extends Component {
	state = {};

	componentDidMount() {
		// Run Links-List script
		new LinksList();

		// Run Sortable script
		runSortable();
	}

	render() {
		return (
			<Fragment>
				<SectionHeader name="Layout and View" faClass="fas fa-brush" />
				<div id="main-side">
					<div className="widget form" id="layout">
						<div className="widget-content radius">
							<div className="row">
								<div className="col-1">
									<div className="field">
										<div className="widget-section">
											<h3>
												<span className="radius-3 focus-shadow">
													Header
												</span>
											</h3>
										</div>
									</div>
								</div>
								<div className="col-1">
									<div className="field">
										<div
											className="widget-box radius blur-shadow"
											data-id="main-menu"
										>
											<h4>Main Menu</h4>
											<button className="settings-btn dark-btn focus-shadow radius-3">
												<i className="fas fa-sliders-h"></i>
												Settings
											</button>
										</div>
									</div>
								</div>
								<div className="col-1">
									<div className="field">
										<div
											className="widget-box radius blur-shadow disabled"
											data-id="shows-slider"
										>
											<h4>Shows Slider</h4>
											<button className="settings-btn dark-btn focus-shadow radius-3">
												<i className="fas fa-sliders-h"></i>
												Settings
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-2">
									<div className="row">
										<div className="col-1">
											<div className="field">
												<div className="widget-section">
													<h3>
														<span className="radius-3 focus-shadow">
															Main Content
														</span>
													</h3>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div
												className="row drop-zone"
												id="main-drop-zone"
											>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="recent-added"
														>
															<h4>
																Recent Added
															</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="ads-1"
														>
															<h4>ADS</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="category-1"
														>
															<h4>Movies</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div className="field">
												<div
													className="add-widget radius"
													id="add-widget-main"
												>
													<h4>
														<a href="#">
															Add Widget
														</a>
													</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-2">
									<div className="row">
										<div className="col-1">
											<div className="field">
												<div className="widget-section">
													<h3>
														<span className="radius-3 focus-shadow">
															Sidebar Content
														</span>
													</h3>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div
												className="row drop-zone"
												id="sidebar-drop-zone"
											>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="social-media-1"
														>
															<h4>
																Social Media
															</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="advance-search"
														>
															<h4>
																Advance Search
															</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="ads-2"
														>
															<h4>ADS</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="today-schedule"
														>
															<h4>
																Today's Schedule
															</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<div
															className="widget-box radius blur-shadow"
															data-id="selected-shows-1"
														>
															<h4>
																Selected Shows
															</h4>
															<button className="settings-btn dark-btn focus-shadow radius-3">
																<i className="fas fa-sliders-h"></i>
																Settings
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div className="field">
												<div
													className="add-widget radius"
													id="add-widget-side"
												>
													<h4>
														<a href="#">
															Add Widget
														</a>
													</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-1">
									<div className="field">
										<div className="widget-section">
											<h3>
												<span className="radius-3 focus-shadow">
													Footer
												</span>
											</h3>
										</div>
									</div>
								</div>
								<div className="col-1">
									<div
										className="row drop-zone"
										id="footer-drop-zone"
									>
										<div className="col-1">
											<div className="field">
												<div
													className="widget-box radius blur-shadow"
													data-id="about-us"
												>
													<h4>About Us</h4>
													<button className="settings-btn dark-btn focus-shadow radius-3">
														<i className="fas fa-sliders-h"></i>
														Settings
													</button>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div className="field">
												<div
													className="widget-box radius blur-shadow"
													data-id="links-list"
												>
													<h4>Important Links</h4>
													<button className="settings-btn dark-btn focus-shadow radius-3">
														<i className="fas fa-sliders-h"></i>
														Settings
													</button>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div className="field">
												<div
													className="widget-box radius blur-shadow"
													data-id="account"
												>
													<h4>Account</h4>
													<button className="settings-btn dark-btn focus-shadow radius-3">
														<i className="fas fa-sliders-h"></i>
														Settings
													</button>
												</div>
											</div>
										</div>
										<div className="col-1">
											<div className="field">
												<div
													className="widget-box radius blur-shadow"
													data-id="social-media-2"
												>
													<h4>Follow Us</h4>
													<button className="settings-btn dark-btn focus-shadow radius-3">
														<i className="fas fa-sliders-h"></i>
														Settings
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<form action="#">
					<div id="end-side">
						<section className="widget form radius" id="add-widget">
							<h3>
								<span>Add Widget</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="widget-type">
												Widget Type
											</label>
											<select
												id="widget-type"
												className="select2"
												name="widget-type"
											>
												<option value="ads">Ads</option>
												<option value="category">
													Category
												</option>
												<option value="selected-shows">
													Selected Shows
												</option>
											</select>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Create
								</button>
							</div>
						</section>

						<section
							className="widget form radius"
							id="recent-added"
						>
							<h3>
								<span>Recent Added</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="title">Title</label>
											<input
												id="title"
												type="text"
												placeholder="default: Recent Added"
											/>
										</div>
									</div>

									<div className="col-2">
										<div className="field">
											<label htmlFor="recent-show-number">
												Show per page
											</label>
											<input
												id="recent-show-number"
												name="recent-show-number"
												type="number"
												min="5"
												placeholder="default: 10"
											/>
										</div>
									</div>

									<div className="col-2">
										<div className="field">
											<label htmlFor="recent-added-status">
												Status
											</label>
											<select
												className="select2"
												name="recent-added-status"
												id="recent-added-status"
											>
												<option value="enable">
													Enable
												</option>
												<option value="disable">
													Disable
												</option>
											</select>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section
							className="widget form radius"
							id="shows-slider"
						>
							<h3>
								<span>Shows Slider</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="shows-slider-category">
												Category
											</label>
											<select
												className="select2"
												name="shows-slider-category"
												id="shows-slider-category"
											>
												<option value="all">All</option>
												<option value="movies">
													Movies
												</option>
												<option value="anime">
													Anime
												</option>
												<option value="tv-shows">
													TV Shows
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="shows-slider-genres">
												Genres
											</label>
											<select
												className="select2"
												name="shows-slider-genres"
												id="shows-slider-genres"
												data-placeholder="default: All"
												multiple
											>
												<option value="action">
													Action
												</option>
												<option value="adventure">
													Adventure
												</option>
												<option value="animation">
													Animation
												</option>
												<option value="biography">
													Biography
												</option>
												<option value="comedy">
													Comedy
												</option>
												<option value="crime">
													Crime
												</option>
												<option value="documentary">
													Documentary
												</option>
												<option value="drama">
													Drama
												</option>
												<option value="family">
													Family
												</option>
												<option value="fantasy">
													Fantasy
												</option>
												<option value="film-noir">
													Film-Noir
												</option>
												<option value="game-show">
													Game-Show
												</option>
												<option value="history">
													History
												</option>
												<option value="horror">
													Horror
												</option>
												<option value="music">
													Music
												</option>
												<option value="musical">
													Musical
												</option>
												<option value="mystery">
													Mystery
												</option>
												<option value="news">
													News
												</option>
												<option value="reality-tv">
													Reality-TV
												</option>
												<option value="romance">
													Romance
												</option>
												<option value="sci-fi">
													Sci-Fi
												</option>
												<option value="sport">
													Sport
												</option>
												<option value="talk-show">
													Talk-Show
												</option>
												<option value="thriller">
													Thriller
												</option>
												<option value="war">War</option>
												<option value="western">
													Western
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="shows-slider-tags">
												Tags
											</label>
											<select
												className="select2 support-tags"
												name="shows-slider-tags"
												id="shows-slider-tags"
												data-placeholder="Press 'enter' after any tag you write"
												multiple
											></select>
											<small>
												Used to group collection of
												shows together under certain
												name
											</small>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="shows-slider-filter">
												Filter By
											</label>
											<select
												className="select2"
												name="shows-slider-filter-1"
												id="shows-slider-filter"
											>
												<option value="latest">
													Latest
												</option>
												<option value="oldest">
													Oldest
												</option>
												<option value="views">
													Most Viewed
												</option>
												<option value="rates">
													Top Rated
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="shows-slider-num">
												Shows Number
											</label>
											<input
												type="number"
												min="4"
												name="shows-slider-num"
												id="shows-slider-num"
												placeholder="default: 8"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="shows-slider-status">
												Status
											</label>
											<select
												id="shows-slider-status"
												className="select2"
												name="shows-slider-status"
											>
												<option value="enabled">
													Enabled
												</option>
												<option value="disabled">
													Disabled
												</option>
											</select>
											<small>
												Enable or Disable Show Slider
												from Home Page
											</small>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section className="widget form radius" id="ads">
							<h3>
								<span>ADS</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="ads">
												HTML Code
											</label>
											<textarea
												id="ads"
												name="ads-1"
												placeholder="HTML Code Here..."
											></textarea>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
								<button className="dark-btn focus-shadow radius">
									Delete
								</button>
							</div>
						</section>

						<section className="widget form radius" id="category">
							<h3>
								<span>Category of Shows</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="category-title">
												Title
											</label>
											<input
												id="category-title"
												name="category-1-title"
												type="text"
												placeholder="default: Category of Shows"
											/>
										</div>
									</div>

									<div className="col-2">
										<div className="field">
											<label htmlFor="category">
												Category
											</label>
											<select
												className="select2"
												name="category-1"
												id="category"
											>
												<option value="all">All</option>
												<option value="movies">
													Movies
												</option>
												<option value="anime">
													anime
												</option>
												<option value="tv-shows">
													TV Shows
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="category-tags">
												Tags
											</label>
											<select
												className="select2 support-tags"
												name="category-1-tags"
												id="category-tags"
												data-placeholder="Press 'enter' after any tag you write"
												multiple
											></select>
											<small>
												Used to group collection of
												shows together under certain
												name
											</small>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
								<button className="dark-btn focus-shadow radius">
									Delete
								</button>
							</div>
						</section>

						<section
							className="widget form radius"
							id="social-media"
						>
							<h3>
								<span>Social Media</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="social-media-title">
												Title
											</label>
											<input
												id="social-media-title"
												name="side-social-media-title"
												type="text"
												placeholder="default: Follow Us"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="social-media-status">
												Status
											</label>
											<select
												id="social-media-status"
												className="select2"
												name="social-media-status-1"
											>
												<option value="enabled">
													Enabled
												</option>
												<option value="disabled">
													Disabled
												</option>
											</select>
											<small>
												Social Media links can be added
												in general settings
											</small>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section className="widget form radius" id="about-us">
							<h3>
								<span>About Us</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="about-us-title">
												Title
											</label>
											<input
												id="about-us-title"
												name="about-us-title"
												type="text"
												placeholder="default: About Us"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="about-us">
												Text
											</label>
											<textarea
												id="about-us"
												className="select2"
												name="about-us"
												placeholder="Enter something about website..."
											></textarea>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section
							className="widget form radius"
							id="today-schedule"
						>
							<h3>
								<span>Today's Schedule</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="today-schedule-title">
												Title
											</label>
											<input
												id="today-schedule-title"
												name="today-schedule-title"
												type="text"
												placeholder="default: Today's Schedule"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="today-schedule-status">
												Status
											</label>
											<select
												id="today-schedule-status"
												className="select2"
												name="today-schedule-status"
											>
												<option value="enabled">
													Enabled
												</option>
												<option value="disabled">
													Disabled
												</option>
											</select>
											<small>
												Enable or Disable Today Schedule
												in the Home Page
											</small>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section
							className="widget form radius"
							id="advance-search"
						>
							<h3>
								<span>Advance Search</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="advance-search-title">
												Title
											</label>
											<input
												id="advance-search-title"
												name="advance-search-title"
												type="text"
												placeholder="default: Advance Search"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="advance-search-status">
												Status
											</label>
											<select
												id="advance-search-status"
												className="select2"
												name="advance-search-status"
											>
												<option value="enabled">
													Enabled
												</option>
												<option value="disabled">
													Disabled
												</option>
											</select>
											<small>
												Enable or Disable Advance Search
												in the Home Page
											</small>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section className="widget form radius" id="account">
							<h3>
								<span>Account</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="account-title">
												Title
											</label>
											<input
												id="account-title"
												name="account-title"
												type="text"
												placeholder="default: Account"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="account-status">
												Status
											</label>
											<select
												id="account-status"
												className="select2"
												name="account-status"
											>
												<option value="enabled">
													Enabled
												</option>
												<option value="disabled">
													Disabled
												</option>
											</select>
											<small>
												Enable or Disable Account Links
												in the Footer
											</small>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>

						<section
							className="widget form radius"
							id="selected-shows"
						>
							<h3>
								<span>Selected Shows</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-title">
												Title
											</label>
											<input
												id="selected-shows-title"
												name="selected-shows-1-title"
												type="text"
												placeholder="default: Selected Shows"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-icon">
												Widget Icon
											</label>
											<div className="icons-wrapper">
												<input
													name="selected-shows-icon"
													value="film"
													id="film-icon"
													type="radio"
												/>
												<label htmlFor="film-icon">
													<i className="fas fa-film"></i>
												</label>
												<input
													name="selected-shows-icon"
													value="star"
													id="star-icon"
													type="radio"
												/>
												<label htmlFor="star-icon">
													<i className="fas fa-star"></i>
												</label>
												<input
													name="selected-shows-icon"
													value="crown"
													id="crown-icon"
													type="radio"
												/>
												<label htmlFor="crown-icon">
													<i className="fas fa-crown"></i>
												</label>
												<input
													name="selected-shows-icon"
													value="heart"
													id="heart-icon"
													type="radio"
												/>
												<label htmlFor="heart-icon">
													<i className="fas fa-heart"></i>
												</label>
												<input
													name="selected-shows-icon"
													value="fire"
													id="fire-icon"
													type="radio"
												/>
												<label htmlFor="fire-icon">
													<i className="fab fa-hotjar"></i>
												</label>
											</div>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-category">
												Category
											</label>
											<select
												className="select2"
												name="selected-shows-category-1"
												id="selected-shows-category"
											>
												<option value="all">All</option>
												<option value="movies">
													Movies
												</option>
												<option value="anime">
													Anime
												</option>
												<option value="tv-shows">
													TV Shows
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-genres">
												Genres
											</label>
											<select
												className="select2"
												name="selected-shows-genres-1"
												id="selected-shows-genres"
												data-placeholder="default: All"
												multiple
											>
												<option value="action">
													Action
												</option>
												<option value="adventure">
													Adventure
												</option>
												<option value="animation">
													Animation
												</option>
												<option value="biography">
													Biography
												</option>
												<option value="comedy">
													Comedy
												</option>
												<option value="crime">
													Crime
												</option>
												<option value="documentary">
													Documentary
												</option>
												<option value="drama">
													Drama
												</option>
												<option value="family">
													Family
												</option>
												<option value="fantasy">
													Fantasy
												</option>
												<option value="film-noir">
													Film-Noir
												</option>
												<option value="game-show">
													Game-Show
												</option>
												<option value="history">
													History
												</option>
												<option value="horror">
													Horror
												</option>
												<option value="music">
													Music
												</option>
												<option value="musical">
													Musical
												</option>
												<option value="mystery">
													Mystery
												</option>
												<option value="news">
													News
												</option>
												<option value="reality-tv">
													Reality-TV
												</option>
												<option value="romance">
													Romance
												</option>
												<option value="sci-fi">
													Sci-Fi
												</option>
												<option value="sport">
													Sport
												</option>
												<option value="talk-show">
													Talk-Show
												</option>
												<option value="thriller">
													Thriller
												</option>
												<option value="war">War</option>
												<option value="western">
													Western
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-tags">
												Tags
											</label>
											<select
												className="select2 support-tags"
												name="selected-shows-1-tags"
												id="selected-shows-tags"
												data-placeholder="Press 'enter' after any tag you write"
												multiple
											></select>
											<small>
												Used to group collection of
												shows together under certain
												name
											</small>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-filter">
												Filter By
											</label>
											<select
												className="select2"
												name="selected-shows-filter-1"
												id="selected-shows-filter"
											>
												<option value="latest">
													Latest
												</option>
												<option value="oldest">
													Oldest
												</option>
												<option value="views">
													Most Viewed
												</option>
												<option value="rates">
													Top Rated
												</option>
											</select>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="selected-shows-num">
												Shows Number
											</label>
											<input
												type="number"
												min="5"
												name="selected-shows-num"
												id="selected-shows-num"
												placeholder="default: 6"
											/>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
								<button className="dark-btn focus-shadow radius">
									Delete
								</button>
							</div>
						</section>

						<section className="widget form radius" id="links-list">
							<h3>
								<span>Links List</span>
							</h3>
							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="links-list-title">
												Title
											</label>
											<input
												id="links-list-title"
												name="links-list-title"
												type="text"
												placeholder="default: Links List"
											/>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label htmlFor="link-name">
												Update Links List
											</label>
											<div
												className="row radius"
												id="nested-form"
											>
												<div className="col-1">
													<div className="field">
														<label htmlFor="link-name">
															Link Name
														</label>
														<input
															id="link-name"
															name="link-name"
															type="text"
															placeholder="e.g. Terms of Use"
														/>
													</div>
												</div>
												<div className="col-1">
													<div className="field">
														<label htmlFor="link-url">
															Link Url
														</label>
														<input
															id="link-url"
															name="link-url"
															type="url"
															placeholder="e.g. http://www.mevid.com/terms-of-use"
														/>
													</div>
												</div>
												<button
													type="button"
													id="links-list-button"
													className="dark-btn radius-3 focus-shadow"
													disabled
												>
													Add Link
												</button>
											</div>
										</div>
									</div>

									<div className="col-1">
										<div className="field">
											<label>Current Links List</label>
											<ul
												id="current-links-list"
												className="blur-shadow radius"
											>
												<li>
													<span
														className="link-name"
														data-url="http://www.mevid.com/about-us"
													>
														About Us
													</span>
													<div className="btns-wrapper">
														<button
															type="button"
															className="move-btn down-btn"
															title="move down"
														></button>
														<button
															type="button"
															className="move-btn up-btn"
															title="move up"
														></button>
														<button
															type="button"
															className="edit-btn"
															title="edit link"
														></button>
														<button
															type="button"
															className="delete-btn"
															title="delete link"
														></button>
													</div>
												</li>
												<li>
													<span
														className="link-name"
														data-url="http://www.mevid.com/terms-of-use"
													>
														Terms of Use
													</span>
													<div className="btns-wrapper">
														<button
															type="button"
															className="move-btn down-btn"
															title="move down"
														></button>
														<button
															type="button"
															className="move-btn up-btn"
															title="move up"
														></button>
														<button
															type="button"
															className="edit-btn"
															title="edit link"
														></button>
														<button
															type="button"
															className="delete-btn"
															title="delete link"
														></button>
													</div>
												</li>
												<li>
													<span
														className="link-name"
														data-url="http://www.mevid.com/join-us"
													>
														Join Us
													</span>
													<div className="btns-wrapper">
														<button
															type="button"
															className="move-btn down-btn"
															title="move down"
														></button>
														<button
															type="button"
															className="move-btn up-btn"
															title="move up"
														></button>
														<button
															type="button"
															className="edit-btn"
															title="edit link"
														></button>
														<button
															type="button"
															className="delete-btn"
															title="delete link"
														></button>
													</div>
												</li>

												<li>
													<span
														className="link-name"
														data-url="http://www.mevid.com/privacy-police"
													>
														Privacy Police
													</span>
													<div className="btns-wrapper">
														<button
															type="button"
															className="move-btn down-btn"
															title="move down"
														></button>
														<button
															type="button"
															className="move-btn up-btn"
															title="move up"
														></button>
														<button
															type="button"
															className="edit-btn"
															title="edit link"
														></button>
														<button
															type="button"
															className="delete-btn"
															title="delete link"
														></button>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<button className="primary-btn focus-shadow radius">
									Save Changes
								</button>
							</div>
						</section>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default Layout;
