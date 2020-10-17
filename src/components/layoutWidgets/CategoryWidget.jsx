import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";

const CategoryWidget = ({ onSubmit, onDelete }) => (
	<FormSideSection
		label="Category of Shows"
		id="category"
		submitBtn={onSubmit}
		deleteBtn={onDelete}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Category of Shows"
				/>
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
							value: "tv-show",
						},
					]}
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
					name="layout.settings.shows_no"
					label="Shows No"
					type="number"
					placeholder="default: 6"
					min="3"
					step="3"
				/>
			</div>
		</div>
	</FormSideSection>
);

export default CategoryWidget;
