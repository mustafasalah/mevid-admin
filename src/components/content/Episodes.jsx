import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import getAuthors from "../services/fakeAuthorsServices.js";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";

class Episodes extends AbstractTablePage {
	tableId = "episodes-table";

	tableColumns = [
		{
			dataProp: "showName",
			label: "Episode Info",
			haveSort: true,
			classNames: "primary-col",
			type: "custom",
			render: (rowData, renderLinksNav) => (
				<Fragment>
					<span
						className="poster radius focus-shadow"
						style={{
							backgroundImage: `url('${rowData.poster}')`,
						}}
					></span>
					<div className="episode">
						<dl className="episode-info">
							<dt>Episode No:</dt>
							<dd>
								<Link to={`/episodes/${rowData.id}`}>
									{`Episode ${rowData.episodeNo
										.toString()
										.padStart(2, "0")}` +
										(rowData.episodeTitle
											? `: ${rowData.episodeTitle}`
											: "")}
								</Link>
							</dd>

							<dt>Show Name:</dt>
							<dd>
								<Link to={`/shows/${rowData.showId}`}>
									{rowData.showName}
								</Link>
							</dd>
						</dl>
						{renderLinksNav()}
					</div>
				</Fragment>
			),
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: "http://localhost/shows/:showId/episodes/:episodeNo",
					absolute: true,
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/episodes/:id",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this episode?"
						);
						isDelete && this.props.deleteData(id);
					},
				},
			],
		},
		{
			dataProp: "category",
			label: "Category",
			haveSort: true,
			type: "text",
		},
		{
			dataProp: "author",
			label: "Author",
			haveSort: true,
			type: "link",
			href: "/users/:authorId",
		},
		{
			dataProp: "comments",
			label: "Comments",
			haveSort: true,
			type: "text",
		},
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
		category: ["tvshow", "anime"],
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

	sectionHeader = (
		<SectionHeader
			name="Episodes"
			link={{ href: "/episodes/add", label: "New Episode" }}
		/>
	);

	handleDelete() {
		const deleteEpisodes = window.confirm(
			"Are you sure to delete the selected shows?"
		);
		deleteEpisodes && this.props.deleteData(this.props.selectedItems);
	}

	handleStatusChange(status) {
		this.props.changeStatus(this.props.selectedItems, status);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.episodes,
	items: state.episodes,
});

const mapDispatchToProps = {
	...getTableActions("episodes"),
	...getDataActions("episodes"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
