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
					href: "#approve-comment-:id",
					on: ({ status }) => status !== "approved",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "approve");
					},
				},
				{
					label: "Unapprove",
					className: "unapprove-item",
					href: "#unapprove-comment-:id",
					on: ({ status }) => status === "approved",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "unapprove");
					},
				},
				{
					label: "Reply",
					className: "reply-item",
					href:
						"http://localhost/shows/:showId/episodes/:episodeNo#comments",
					absolute: true,
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-comment-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this comment?"
						);
						isDelete && this.props.deleteData(id);
					},
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
						{rowData.replyAuthorId && (
							<Fragment>
								<a
									href={`http://localhost/user/${rowData.replyAuthorId}`}
									target="_blank"
								>
									{
										this.props.authors.find(
											(author) =>
												author.id ==
												rowData.replyAuthorId
										).username
									}
								</a>
								<i> Comments on:</i>
								<br />
							</Fragment>
						)}
						<a
							className={rowData.replyAuthorId ? "mg-top" : ""}
							href={`http://localhost/shows/${rowData.showId}/episodes/${rowData.episodeNo}`}
							target="_blank"
						>
							Episode
							{` ${rowData.episodeNo
								.toString()
								.padStart(2, "0")}: ${rowData.showName}`}
						</a>
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
		const isDelete = window.confirm("Are you sure to delete this comment?");
		isDelete && this.props.deleteData(this.props.selectedItems);
	}

	handleStatusChange(status) {
		this.props.changeStatus(this.props.selectedItems, status);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.comments,
	items: state.comments,
	authors: state.users,
});

const mapDispatchToProps = {
	...getTableActions("comments"),
	...getDataActions("comments"),
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
