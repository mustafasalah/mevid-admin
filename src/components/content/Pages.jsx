import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getPages from "./../services/fakePagesServices";

class Pages extends AbstractTablePage {
	tableId = "pages-table";

	tableColumns = [
		{
			dataProp: "title",
			label: "Page Title",
			haveSort: true,
			classNames: "primary-col",
			type: "link",
			href: "/pages/:id",
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: "/pages/:id",
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/pages/edit/:id",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "/pages/delete/:id",
				},
			],
		},
		{
			dataProp: "author",
			label: "Author",
			classNames: "more-padding",
			haveSort: true,
			type: "link",
			href: "/users/:authorId",
		},
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
		{
			dataProp: "publishDate",
			label: "Submitted On",
			haveSort: true,
			type: "text",
		},
		{
			dataProp: "views",
			label: "Views",
			haveSort: true,
			type: "text",
		},
	];

	filtersData = {
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

	sectionHeader = (
		<SectionHeader
			name="Pages"
			faClass="fas fa-copy"
			link={{ label: "New Page", href: "/pages/new" }}
		/>
	);

	constructor(props) {
		super(props);
		this.getData = getPages;
	}

	handleDelete() {
		console.log(this.state.selectedItems, " Deleted!");
	}

	handleStatusChange(status) {
		console.log(this.state.selectedItems, " Changed to " + status + "!");
	}
}

const mapStateToProps = (state) => ({
	...state.tables.pages,
	items: state.pages,
});

const mapDispatchToProps = {
	...getTableActions("pages"),
	...getDataActions("pages"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
