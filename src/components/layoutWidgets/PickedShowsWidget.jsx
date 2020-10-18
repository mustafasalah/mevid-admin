import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { getGenresOptions } from "./../services/getGenres";

const PickedShowsWidget = ({ onSubmit, onDelete }) => (
	<FormSideSection
		label="Picked Shows"
		id="selected-shows"
		submitBtn={onSubmit}
		deleteBtn={onDelete}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Picked Shows"
				/>
			</div>

			<div className="col-1">
				<div className="field">
					<label htmlFor="selected-shows-icon">Widget Icon</label>
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
				<FormField
					name="layout.settings.category"
					label="Category"
					type="select"
					options={[
						{
							label: "Movie",
							value: "movie",
						},
						{ label: "Anime", value: "anime" },
						{
							label: "TV Show",
							value: "tvshow",
						},
					]}
					multiple
				/>
			</div>

			<div className="col-1">
				<FormField
					name="layout.settings.genres"
					label="Genres"
					type="select"
					options={getGenresOptions}
					placeholder="Default: All"
					multiple
				/>
			</div>

			<div className="col-1">
				<TagsField
					name="layout.settings.tag"
					label="Tags"
					type="select"
					placeholder="Press 'enter' after any tag you write"
					multiple
					tags
					htmlAfterField={
						<small>
							Used to group collection of shows together under
							certain name
						</small>
					}
				/>
			</div>

			<div className="col-1">
				<FormField
					name="layout.settings.order"
					label="Order By"
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
					name="layout.settings.shows_no"
					label="Shows No"
					type="number"
					min="2"
					placeholder="default: 8"
				/>
			</div>
		</div>
	</FormSideSection>
);

export default PickedShowsWidget;
