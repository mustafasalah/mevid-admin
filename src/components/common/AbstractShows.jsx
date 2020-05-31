import getAuthors from "../services/fakeAuthorsServices";
import AbstractTablePage from "./AbstractTablePage";
import getGenres from "./../services/getGenres";

class AbstractShows extends AbstractTablePage {
	tableColumns = [
		{
			dataProp: "poster",
			label: "Poster",
			haveSort: false,
			type: "img",
			alt: ":name",
		},
		{
			dataProp: "name",
			label: "Show Name",
			haveSort: true,
			classNames: "primary-col",
			type: "link",
			href: "/shows/:id",
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: "/shows/:id",
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/shows/edit/:id",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "/shows/delete/:id",
				},
			],
		},
		{
			dataProp: "author",
			label: "Author",
			haveSort: true,
			type: "link",
			href: "/users/:authorId",
		},
		{ dataProp: "reviews", label: "Reviews", haveSort: true, type: "text" },
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
		{
			dataProp: "publishDate",
			label: "Publish date",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "views", label: "Views", haveSort: true, type: "text" },
	];

	filtersData = {
		genres: getGenres(this.constructor.name.toLowerCase()),
		author: getAuthors(),
		status: ["published", "drafted"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
		},
		{
			value: "draft",
			label: "Make a draft",
			handler: this.handleStatusChange.bind(this, "draft"),
		},
		{
			value: "publish",
			label: "Publish",
			handler: this.handleStatusChange.bind(this, "publish"),
		},
	];

	handleDelete() {
		console.log(this.props.selectedItems, " Deleted!");
	}

	handleStatusChange(status) {
		console.log(this.props.selectedItems, " Changed to " + status + "!");
	}
}

export default AbstractShows;
