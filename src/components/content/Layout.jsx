import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SectionHeader from "./../common/SectionHeader";
import layoutActions from "./../../actions/LayoutActions";
import FormSideSection from "./../common/form/FormSideSection";
import LinksList from "../../js/LinksList";
import runSortable from "../../js/Sortable";
import WidgetSection from "./WidgetSection";
import Widget from "./Widget";
import FormField from "../common/form/FormField";
import getGenres from "./../services/getGenres";
import TagsField from "./TagsField";
import { sortLayout } from "../services/layoutServices";
import { toast } from "react-toastify";

class Layout extends Component {
	async onSortedHandler({
		newContainer: { id: containerId },
		oldIndex,
		newIndex,
	}) {
		const { onLayoutSorted } = this.props;
		const dropzone = containerId.slice(0, containerId.indexOf("-"));
		onLayoutSorted(dropzone, oldIndex, newIndex);

		try {
			await sortLayout(dropzone, { oldIndex, newIndex });
		} catch (ex) {
			// alert error message
			toast.error(ex.response.data);

			// reverse changes
			onLayoutSorted(dropzone, newIndex, oldIndex);

			// // force update
			// this.forceUpdate(() => this.forceUpdate);
		}
	}

	componentDidMount() {
		// Run Links-List script
		new LinksList();

		// Run Sortable script
		const { mainSortable, sidebarSortable, footerSortable } = runSortable();

		const { onSortedHandler } = this;
		mainSortable.on("sortable:sorted", onSortedHandler.bind(this));
		sidebarSortable.on("sortable:sorted", onSortedHandler.bind(this));
		footerSortable.on("sortable:sorted", onSortedHandler.bind(this));
	}

	render() {
		const { header, main, sidebar, footer } = this.props;

		return (
			<Fragment>
				<SectionHeader name="Layout and View" faClass="fas fa-brush" />
				<div id="main-side">
					<div className="widget form" id="layout">
						<div className="widget-content radius">
							<div className="row">
								<WidgetSection title="Header">
									<Widget
										data={{
											title: "Main Menu",
											type: "main-menu",
											enabled: "1",
										}}
									/>
									{header.map((widget) => (
										<Widget key={widget.id} data={widget} />
									))}
								</WidgetSection>
							</div>
							<div className="row">
								<div className="col-2">
									<div className="row">
										<WidgetSection
											title="Main Content"
											dropzone="main-drop-zone"
											haveAddWidget
										>
											{main.map((widget) => (
												<Widget
													key={widget.id}
													data={widget}
												/>
											))}
										</WidgetSection>
									</div>
								</div>
								<div className="col-2">
									<div className="row">
										<WidgetSection
											title="Sidebar Content"
											dropzone="sidebar-drop-zone"
											haveAddWidget
										>
											{sidebar.map((widget) => (
												<Widget
													key={widget.id}
													data={widget}
												/>
											))}
										</WidgetSection>
									</div>
								</div>
							</div>
							<div className="row">
								<WidgetSection
									title="Footer"
									dropzone="footer-drop-zone"
								>
									{footer.map((widget) => (
										<Widget key={widget.id} data={widget} />
									))}
								</WidgetSection>
							</div>
						</div>
					</div>
				</div>
				<form action="#">
					{/* <div id="end-side">
						<FormSideSection label="Add Widget" id="add-widget">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Widget Type"
										type="select"
										placeholder="Select Widget Type..."
										options={[
											{ label: "Ads", value: "ads" },
											{
												label: "Category",
												value: "category",
											},
											{
												label: "Selected Shows",
												value: "selected-shows",
											},
										]}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection label="Recent Added" id="recent-added">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Recent Added"
									/>
								</div>

								<div className="col-2">
									<FormField
										label="Shows per page"
										type="number"
										placeholder="default: 10"
										min="5"
									/>
								</div>

								<div className="col-2">
									<FormField label="Enabled" type="radio" />
								</div>
							</div>
						</FormSideSection>

						<FormSideSection label="Shows Slider" id="shows-slider">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Category"
										type="select"
										options={[
											{ label: "All", value: "all" },
											{
												label: "Movies",
												value: "movies",
											},
											{ label: "Anime", value: "anime" },
											{
												label: "TV Shows",
												value: "tv-shows",
											},
										]}
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Genres"
										type="select"
										options={[
											{ label: "All", value: "all" },
											...getGenres(),
										]}
										placeholder="Default: All"
										multiple
									/>
								</div>

								<div className="col-1">
									<TagsField
										label="Tags"
										type="select"
										placeholder="Press 'enter' after any tag you write"
										multiple
										tags
										unwrappedField
										htmlAfterField={
											<small>
												Used to group collection of
												shows together under certain
												name
											</small>
										}
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Filter By"
										type="select"
										options={[
											{
												label: "Latest",
												value: "latest",
											},
											{
												label: "Oldest",
												value: "oldest",
											},
											{
												label: "Most Viewed",
												value: "views",
											},
											{
												label: "Top Rated",
												value: "rates",
											},
										]}
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Shows No"
										type="number"
										min="4"
										placeholder="default: 8"
									/>
								</div>

								<div className="col-1">
									<FormField label="Enabled" type="radio" />
								</div>
							</div>
						</FormSideSection>

						<FormSideSection title="ADS" id="ads">
							<div className="row">
								<div className="col-1">
									<FormField
										label="HTML Code"
										type="textarea"
										placeholder="HTML Code Here..."
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection
							title="Category of Shows"
							id="category"
						>
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Category of Shows"
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Category"
										type="select"
										options={[
											{ label: "All", value: "all" },
											{
												label: "Movies",
												value: "movies",
											},
											{ label: "Anime", value: "anime" },
											{
												label: "TV Shows",
												value: "tv-shows",
											},
										]}
									/>
								</div>

								<div className="col-1">
									<TagsField
										label="Tags"
										type="select"
										placeholder="Press 'enter' after any tag you write"
										multiple
										tags
										unwrappedField
										htmlAfterField={
											<small>
												Used to group collection of
												shows together under certain
												name
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection title="Social Media" id="social-media">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Follow Us"
									/>
								</div>
								<div className="col-1">
									<FormField
										label="Enabled"
										type="radio"
										htmlAfterField={
											<small>
												Social Media links can be added
												in general settings
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection title="About Us" id="about-us">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: About Us"
									/>
								</div>
								<div className="col-1">
									<FormField
										label="Content"
										type="textarea"
										placeholder="Enter something about website..."
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection
							title="Today's Schedule"
							id="today-schedule"
						>
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Today's Schedule"
									/>
								</div>
								<div className="col-1">
									<FormField
										label="Enabled"
										type="radio"
										htmlAfterField={
											<small>
												Enable or Disable Today Schedule
												in the Home Page
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection
							title="Advance Search"
							id="advance-search"
						>
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Advance Search"
									/>
								</div>
								<div className="col-1">
									<FormField
										label="Enabled"
										type="radio"
										htmlAfterField={
											<small>
												Enable or Disable Advance Search
												in the Home Page
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection title="Account" id="account">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Account"
									/>
								</div>
								<div className="col-1">
									<FormField
										label="Enabled"
										type="radio"
										htmlAfterField={
											<small>
												Enable or Disable Account Links
												in the Footer
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection
							label="Selected Shows"
							id="selected-shows"
						>
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Selected Shows"
									/>
								</div>

								<div className="col-1">
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

								<div className="col-1">
									<FormField
										label="Category"
										type="select"
										options={[
											{ label: "All", value: "all" },
											{
												label: "Movies",
												value: "movies",
											},
											{ label: "Anime", value: "anime" },
											{
												label: "TV Shows",
												value: "tv-shows",
											},
										]}
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Genres"
										type="select"
										options={[
											{ label: "All", value: "all" },
											...getGenres(),
										]}
										placeholder="Default: All"
										multiple
									/>
								</div>

								<div className="col-1">
									<TagsField
										label="Tags"
										type="select"
										placeholder="Press 'enter' after any tag you write"
										multiple
										tags
										unwrappedField
										htmlAfterField={
											<small>
												Used to group collection of
												shows together under certain
												name
											</small>
										}
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Filter By"
										type="select"
										options={[
											{
												label: "Latest",
												value: "latest",
											},
											{
												label: "Oldest",
												value: "oldest",
											},
											{
												label: "Most Viewed",
												value: "views",
											},
											{
												label: "Top Rated",
												value: "rates",
											},
										]}
									/>
								</div>

								<div className="col-1">
									<FormField
										label="Shows No"
										type="number"
										min="4"
										placeholder="default: 8"
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection label="Links List" id="links-list">
							<div className="row">
								<div className="col-1">
									<FormField
										label="Title"
										type="text"
										placeholder="default: Links List"
									/>
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
						</FormSideSection>
					</div>*/}
				</form>
			</Fragment>
		);
	}
}

export default connect((state) => state.layout, {
	onLayoutSorted: layoutActions.sortLayout,
})(Layout);
