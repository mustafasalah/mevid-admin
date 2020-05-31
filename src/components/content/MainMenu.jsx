import React, { Component, Fragment } from "react";
import SectionHeader from "./../common/SectionHeader";
import runSortable from "../../js/Sortable";

class MainMenu extends Component {
	state = {};

	componentDidMount() {
		// Run Sortable script
		runSortable("menu");
	}

	render() {
		return (
			<Fragment>
				<SectionHeader name="Main Menu" faClass="fas fa-list" />

				<div id="main-side">
					<div className="widget menu-widget form" id="layout">
						<div className="widget-content radius">
							<div className="row">
								<div className="col-1">
									<div className="field">
										<div className="widget-section">
											<h3>
												<span className="radius-3 blur-shadow">
													Menu Structure
												</span>
											</h3>
										</div>
									</div>
								</div>

								<div className="col-1">
									<div className="row drop-zone main-menu-drop-zone">
										<div className="col-1">
											<div className="row">
												<div className="col-1">
													<div className="field">
														<div className="widget-box radius blur-shadow">
															<h4>Home</h4>
															<button
																type="button"
																className="sub-link dark-btn radius-3 blur-shadow"
															>
																Sub Links
															</button>

															<i
																className="link-type"
																title="link type"
															>
																Custom Link
															</i>
															<div className="btns-wrapper">
																<button
																	title="edit link"
																	type="button"
																	className="edit-btn"
																></button>
																<button
																	title="delete link"
																	type="button"
																	className="delete-btn"
																></button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
										</div>

										<div className="col-1">
											<div className="row">
												<div className="col-1">
													<div className="field">
														<div className="widget-box radius blur-shadow">
															<h4>Movies</h4>
															<button
																type="button"
																className="sub-link dark-btn radius-3 blur-shadow"
															>
																Sub Links
															</button>
															<i
																className="link-type"
																title="link type"
															>
																Category
															</i>
															<div className="btns-wrapper">
																<button
																	title="edit link"
																	type="button"
																	className="edit-btn"
																></button>
																<button
																	title="delete link"
																	type="button"
																	className="delete-btn"
																></button>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
										</div>

										<div className="col-1">
											<div className="row">
												<div className="col-1">
													<div className="field">
														<div className="widget-box radius blur-shadow">
															<h4>Anime</h4>
															<button
																type="button"
																className="sub-link dark-btn radius-3 blur-shadow"
															>
																Sub Links
															</button>
															<i
																className="link-type"
																title="link type"
															>
																Category
															</i>
															<div className="btns-wrapper">
																<button
																	title="edit link"
																	type="button"
																	className="edit-btn"
																></button>
																<button
																	title="delete link"
																	type="button"
																	className="delete-btn"
																></button>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className="row drop-zone sub-menu main-menu-drop-zone radius">
												<div className="col-1">
													<div className="row">
														<div className="col-1">
															<div className="field">
																<div className="widget-box radius blur-shadow">
																	<h4>
																		Top
																		Anime
																	</h4>
																	<button
																		type="button"
																		className="sub-link dark-btn radius-3 blur-shadow"
																	>
																		Sub
																		Links
																	</button>
																	<i
																		className="link-type"
																		title="link type"
																	>
																		Tag
																	</i>
																	<div className="btns-wrapper">
																		<button
																			title="edit link"
																			type="button"
																			className="edit-btn"
																		></button>
																		<button
																			title="delete link"
																			type="button"
																			className="delete-btn"
																		></button>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
												</div>

												<div className="col-1">
													<div className="row">
														<div className="col-1">
															<div className="field">
																<div className="widget-box radius blur-shadow">
																	<h4>
																		Seasonal
																		Anime
																	</h4>
																	<button
																		type="button"
																		className="sub-link dark-btn radius-3 blur-shadow"
																	>
																		Sub
																		Links
																	</button>
																	<i
																		className="link-type"
																		title="link type"
																	>
																		Tag
																	</i>
																	<div className="btns-wrapper">
																		<button
																			title="edit link"
																			type="button"
																			className="edit-btn"
																		></button>
																		<button
																			title="delete link"
																			type="button"
																			className="delete-btn"
																		></button>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
												</div>

												<div className="col-1">
													<div className="row">
														<div className="col-1">
															<div className="field">
																<div className="widget-box radius blur-shadow">
																	<h4>
																		Upcoming
																		Anime
																	</h4>
																	<button
																		type="button"
																		className="sub-link dark-btn radius-3 blur-shadow"
																	>
																		Sub
																		Links
																	</button>
																	<i
																		className="link-type"
																		title="link type"
																	>
																		Tag
																	</i>
																	<div className="btns-wrapper">
																		<button
																			title="edit link"
																			type="button"
																			className="edit-btn"
																		></button>
																		<button
																			title="delete link"
																			type="button"
																			className="delete-btn"
																		></button>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
												</div>
											</div>
										</div>

										<div className="col-1">
											<div className="row">
												<div className="col-1">
													<div className="field">
														<div className="widget-box radius blur-shadow">
															<h4>TV Shows</h4>
															<button
																type="button"
																className="sub-link dark-btn radius-3 blur-shadow"
															>
																Sub Links
															</button>
															<i
																className="link-type"
																title="link type"
															>
																Category
															</i>
															<div className="btns-wrapper">
																<button
																	title="edit link"
																	type="button"
																	className="edit-btn"
																></button>
																<button
																	title="delete link"
																	type="button"
																	className="delete-btn"
																></button>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
										</div>

										<div className="col-1">
											<div className="row">
												<div className="col-1">
													<div className="field">
														<div className="widget-box radius blur-shadow">
															<h4>FAQ</h4>
															<button
																type="button"
																className="sub-link dark-btn radius-3 blur-shadow"
															>
																Sub Links
															</button>
															<i
																className="link-type"
																title="link type"
															>
																Page
															</i>
															<div className="btns-wrapper">
																<button
																	title="edit link"
																	type="button"
																	className="edit-btn"
																></button>
																<button
																	title="delete link"
																	type="button"
																	className="delete-btn"
																></button>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className="row drop-zone sub-menu main-menu-drop-zone radius"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<form action="#">
					<div id="end-side">
						<section className="widget form radius">
							<h3>Custom Link</h3>

							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="navigation-label-1">
												Navigation Label
											</label>
											<input
												id="naviagtion-label-1"
												type="text"
												placeholder="e.g. Scheduler"
											/>
										</div>
									</div>
									<div className="col-1">
										<div className="field">
											<label htmlFor="url">URL</label>
											<input
												id="url"
												type="url"
												placeholder="e.g. http://www.mevid.com/scheduler.html"
											/>
										</div>
									</div>
								</div>
								<button
									type="button"
									className="dark-btn radius focus-shadow"
								>
									Add to Menu
								</button>
							</div>
						</section>
						<section className="widget form radius">
							<h3>Pages</h3>

							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="navigation-label-2">
												Navigation Label
											</label>
											<input
												id="naviagtion-label-2"
												type="text"
												placeholder="e.g. About Us"
											/>
										</div>
									</div>
									<div className="col-1">
										<div className="field">
											<label htmlFor="pages-list">
												Select Page
											</label>
											<select
												className="select2"
												id="pages-list"
											>
												<option value="about-us">
													About Us
												</option>
												<option value="terms-of-use">
													Terms of Use
												</option>
												<option value="join-us">
													Join us
												</option>
												<option value="private-policy">
													Private Policy
												</option>
												<option value="faq">FAQ</option>
											</select>
										</div>
									</div>
								</div>
								<button
									type="button"
									className="dark-btn radius focus-shadow"
								>
									Add to Menu
								</button>
							</div>
						</section>
						<section className="widget form radius">
							<h3>Category</h3>

							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="navigation-label-3">
												Navigation Label
											</label>
											<input
												id="naviagtion-label-3"
												type="text"
												placeholder="e.g. Movies"
											/>
										</div>
									</div>
									<div className="col-1">
										<div className="field">
											<label htmlFor="pages-list">
												Select Category
											</label>
											<select
												className="select2"
												id="categories-list"
											>
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
								</div>
								<button
									type="button"
									className="dark-btn radius focus-shadow"
								>
									Add to Menu
								</button>
							</div>
						</section>
						<section className="widget form radius">
							<h3>Tags</h3>

							<div className="widget-content">
								<div className="row">
									<div className="col-1">
										<div className="field">
											<label htmlFor="navigation-label-4">
												Navigation Label
											</label>
											<input
												id="naviagtion-label-4"
												type="text"
												placeholder="e.g. Movies"
											/>
										</div>
									</div>
									<div className="col-1">
										<div className="field">
											<label htmlFor="pages-list">
												Select Tag
											</label>
											<select
												className="select2"
												id="tags-list"
											>
												<option value="upcoming anime">
													Upcoming Anime
												</option>
												<option value="seasonal anime">
													Seasonal Anime
												</option>
												<option value="top HBO shows">
													Top HBO Shows
												</option>
												<option value="netflix shows">
													Netflix Shows
												</option>
												<option value="best movies 2018">
													Best Movies 2018
												</option>
												<option value="top anime 2017">
													Top Anime 2017
												</option>
											</select>
										</div>
									</div>
								</div>
								<button
									type="button"
									className="dark-btn radius focus-shadow"
								>
									Add to Menu
								</button>
							</div>
						</section>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default MainMenu;
