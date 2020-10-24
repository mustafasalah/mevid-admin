import React from "react";
import FormSideSection from "../common/form/FormSideSection";
import FormField from "../common/form/FormField";
import { getGenresOptions } from "./../services/getGenres";
import TagsField from "./TagsField";
import { connect } from "react-redux";

const genresOptions = getGenresOptions.map((genre) => {
	genre.value = `/browse/all/${window.encodeURIComponent(genre.value)}`;
	return genre;
});

const MainMenuForm = ({ form, pages, siteContent }) => {
	const isUpdate = form.id !== "";

	const linkField = () => {
		switch (form.type) {
			case "link":
				return (
					<FormField
						name="mainmenu.link"
						label="URL"
						type="url"
						placeholder="e.g. http://www.mevid.com/scheduler"
					/>
				);

			case "page":
				return (
					<FormField
						name="mainmenu.link"
						label="Page"
						type="select"
						options={pages.map((page) => ({
							label: page.title,
							value: `/page/${window.encodeURIComponent(
								page.title
							)}`,
						}))}
						placeholder="Select page..."
					/>
				);

			case "category":
				return (
					<FormField
						name="mainmenu.link"
						label="Category"
						type="select"
						options={siteContent.map((content) => {
							let label;
							if (content === "movies") {
								label = "Movies";
							} else if (content === "tvshows") {
								label = "TV Shows";
							} else {
								label = "Anime";
							}
							return {
								label,
								value: `/${content}`,
							};
						})}
						placeholder="Select category..."
					/>
				);

			case "genre":
				return (
					<FormField
						name="mainmenu.link"
						label="Genre"
						type="select"
						options={genresOptions}
						placeholder="Select genre..."
					/>
				);

			case "tag":
				return (
					<TagsField
						name="mainmenu.link"
						label="Tags"
						type="select"
						tagValuePrefix="/tag/"
						urlEncodeValue
						placeholder="Select tag..."
					/>
				);

			default:
				return;
		}
	};

	return (
		<FormSideSection
			label={isUpdate ? "Update Menu Item" : "Add Menu Item"}
			submitBtn={{
				label: isUpdate ? "Update" : "Add to Menu",
				handler: () => {},
			}}
			opened
		>
			<div className="row">
				<div className="col-1">
					<FormField
						name="mainmenu.label"
						label="Navigation Label"
						type="text"
						placeholder="e.g. Movies"
					/>
				</div>

				<div className="col-1">
					<FormField
						name="mainmenu.type"
						label="Link Type"
						type="select"
						options={[
							{ label: "Custom Link", value: "link" },
							{
								label: "Category",
								value: "category",
							},
							{ label: "Genre", value: "genre" },
							{ label: "Page", value: "page" },
							{ label: "Tag", value: "tag" },
						]}
						placeholder="Select link type..."
					/>
				</div>

				<div className="col-1">{linkField()}</div>
			</div>
		</FormSideSection>
	);
};

export default connect((state) => ({
	pages: state.pages,
	siteContent: state.forms.settings.data.site_content,
	form: state.forms.mainmenu.data,
}))(MainMenuForm);
