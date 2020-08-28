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
					href: "http://localhost/shows/:id",
					absolute: true,
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/shows/:id",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this show?"
						);
						isDelete && this.props.deleteData(id);
					},
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
		genres: getGenres(this.constructor.name),
		author: getAuthors().map((author) => author.name),
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

	componentWillUpdate() {
		this.filtersData.author = getAuthors().map((author) => author.name);
	}

	handleDelete() {
		const deleteShows = window.confirm(
			"Are you sure to delete the selected shows?"
		);
		deleteShows && this.props.deleteData(this.props.selectedItems);
	}

	handleStatusChange(status) {
		this.props.changeStatus(this.props.selectedItems, status);
	}
}

export default AbstractShows;
