import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getReviews from "./../services/fakeReviewsServices";

class Reviews extends AbstractTablePage {
	tableId = "reviews-table";

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
			label: "Review",
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
					label: "Delete",
					className: "delete-item",
					href: "/reviews/delete/:id",
				},
			],
		},
		{
			dataProp: "rate",
			label: "Rate",
			haveSort: true,
			type: "custom",
			render: (rowData) => (
				<Fragment>
					<span title={`${rowData.rate} of 5`} className="rating">
						{[0, 0, 0, 0, 0]
							.fill(1, 0, rowData.rate)
							.map((isfilledStar) => (
								<i
									className={`${
										isfilledStar ? "fas" : "far"
									} fa-star`}
								></i>
							))}
					</span>
				</Fragment>
			),
		},
		{
			dataProp: "showName",
			label: "Show",
			haveSort: true,
			classNames: "align-start primary-col",
			type: "link",
			href: "/shows/:showId",
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
		rate: [1, 2, 3, 4, 5],
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
		<SectionHeader name="Reviews" faClass="fas fa-star-half-alt" />
	);

	constructor(props) {
		super(props);
		this.getData = getReviews;
	}

	handleDelete() {
		console.log(this.state.selectedItems, " Deleted!");
	}

	handleStatusChange(status) {
		console.log(this.state.selectedItems, " Changed to " + status + "!");
	}
}

const mapStateToProps = (state) => ({
	...state.tables.reviews,
	items: state.reviews,
});

const mapDispatchToProps = {
	...getTableActions("reviews"),
	...getDataActions("reviews"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
