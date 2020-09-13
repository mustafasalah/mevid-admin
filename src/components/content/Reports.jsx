import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "../common/SectionHeader";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Reports extends AbstractTablePage {
	tableId = "reports-table";

	tableColumns = [
		{
			dataProp: "show_id",
			label: "Report on",
			classNames: "primary-col align-start",
			haveSort: false,
			type: "custom",
			render: ({ showId, episodeNo, showName }, renderLinksNav) => {
				return (
					<Fragment>
						<a
							href={`${HOSTNAME}/shows/${showId}${
								episodeNo ? "/episodes/" + episodeNo : ""
							}`}
							target="_blank"
						>
							{`${showName}${
								episodeNo
									? " - Episode " +
									  episodeNo.toString().padStart(2, "0")
									: ""
							}`}
						</a>
						{renderLinksNav()}
					</Fragment>
				);
			},
			linksNav: [
				{
					label: "Fix",
					className: "fix-item",
					href: "#fix-report-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure you fixed this report?"
						);
						isDelete && this.props.deleteData(id);
					},
				},
			],
		},
		{
			dataProp: "description",
			label: "Description",
			classNames: "more-padding",
			haveSort: false,
			type: "text",
			default: "No description provided",
		},
		{
			dataProp: "date",
			label: "Submitted On",
			haveSort: true,
			type: "text",
		},
	];

	actions = [
		{
			value: "fix",
			label: "Fix",
			handler: this.handleDelete.bind(this),
		},
	];

	sectionHeader = (<SectionHeader name="Reports" faClass="fas fa-bug" />);

	handleDelete() {
		const isDelete = window.confirm(
			"Are you sure you have fixed the selected reports?"
		);
		isDelete && this.props.deleteData(this.props.selectedItems);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.reports,
	items: state.reports,
});

const mapDispatchToProps = {
	...getTableActions("reports"),
	...getDataActions("reports"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
