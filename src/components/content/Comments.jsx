import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";

class Comments extends AbstractTablePage {
	tableId = "comments-table";

	tableColumns = [
		{
			dataProp: "author",
			label: "Author",
			haveSort: true,
			classNames: "more-padding primary-col",
			type: "link",
			href: "/users/:authorId",
		},
		{
			dataProp: "content",
			label: "Comment",
			classNames: "align-start",
			haveSort: false,
			type: "text",
			linksNav: [
				{
					label: "Approve",
					className: "approve-item",
					href: "#",
					on: ({ status }) => status !== "approved",
				},
				{
					label: "Unapprove",
					className: "unapprove-item",
					href: "#",
					on: ({ status }) => status === "approved",
				},
				{
					label: "Reply",
					className: "reply-item",
					href: "#",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "/comments/delete/:id",
				},
			],
		},
		{
			dataProp: "episodeNo",
			label: "Response to",
			classNames: "align-start",
			haveSort: false,
			type: "custom",
			render: (rowData) => (
				<Fragment>
					<p>
						{rowData.reply && (
							<Fragment>
								<Link to={`/users/${rowData.reply.authorId}`}>
									{rowData.reply.author}
								</Link>
								<i> Comments on:</i>
								<br />
							</Fragment>
						)}
						<Link
							className={rowData.reply ? "mg-top" : ""}
							to={`/episodes/${rowData.episodeId}`}
						>
							Episode
							{` ${rowData.episodeNo
								.toString()
								.padStart(2, "0")}: ${rowData.showName}`}
						</Link>
					</p>
				</Fragment>
			),
		},
		{
			dataProp: "publishDate",
			label: "Submitted On",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
	];

	filtersData = {
		status: ["approved", "unapproved"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
		},
		{
			value: "approve",
			label: "Approve",
			handler: this.handleStatusChange.bind(this, "approve"),
		},
		{
			value: "unapprove",
			label: "Unapprove",
			handler: this.handleStatusChange.bind(this, "unapprove"),
		},
	];

	sectionHeader = (
		<SectionHeader name="Comments" faClass="fas fa-comments" />
	);

	handleDelete() {
		console.log(this.state.selectedItems, " Deleted!");
	}

	handleStatusChange(status) {
		console.log(this.state.selectedItems, " Changed to " + status + "!");
	}
}

const mapStateToProps = (state) => ({
	...state.tables.comments,
	items: state.comments,
});

const mapDispatchToProps = {
	...getTableActions("comments"),
	...getDataActions("comments"),
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
