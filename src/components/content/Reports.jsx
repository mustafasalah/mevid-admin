import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "../common/SectionHeader";
import { authorize } from "./../../js/Utility";
import text from "../../langs/lang";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Reports extends AbstractTablePage {
    tableId = "reports-table";

    tableColumns = [
        {
            dataProp: "show_id",
            label: text("report_on"),
            classNames: "primary-col",
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
                            rel="noreferrer"
                        >
                            {`${showName}${
                                episodeNo
                                    ? ` - ${text("the_episode")} ` +
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
                    label: text("fix"),
                    className: "fix-item",
                    href: "#fix-report-:id",
                    onClick: ({ id }) => {
                        const isDelete = window.confirm(
                            text("are_you_sure_you_fixed_this_report")
                        );
                        isDelete && this.props.deleteData(id);
                    },
                    permission: "supervisor",
                    customAuthorize: (report) => {
                        return (
                            this.getReportOn(report).authorId ===
                            this.props.loggedUser.id
                        );
                    },
                },
            ],
        },
        {
            dataProp: "description",
            label: text("description"),
            classNames: "more-padding",
            haveSort: false,
            type: "text",
            default: text("no_description_provided"),
        },
        {
            dataProp: "date",
            label: text("submitted_on"),
            haveSort: true,
            type: "text",
        },
    ];

    actions = [
        {
            value: "fix",
            label: text("fix"),
            handler: this.handleDelete.bind(this),
        },
    ];

    sectionHeader = (
        <SectionHeader name={text("reports")} faClass="fas fa-bug" />
    );

    getReportOn(report) {
        const { episodes, shows } = this.props;
        if (report.episodeNo) {
            return episodes.find(
                (ep) =>
                    ep.episodeNo === report.episodeNo &&
                    ep.showId === report.showId
            );
        } else {
            return shows.find((show) => show.id === report.showId);
        }
    }

    authorizeActionOnSelectedItems() {
        let { selectedItems, items, loggedUser } = this.props;

        // filter the selectItem if the logged user is authorized to the action
        // with all selected items only his own items
        if (authorize(loggedUser.role, "supervisor") === false) {
            selectedItems = selectedItems.filter((id) => {
                const selectedReport = items.find((item) => item.id === id);
                const reportOn = this.getReportOn(selectedReport);

                if (reportOn.authorId === loggedUser.id) return true;

                return false;
            });
        }

        return selectedItems;
    }

    handleDelete() {
        const isDelete = window.confirm(
            text("are_you_sure_you_have_fixed_the_selected_reports")
        );
        const selectedItems = this.authorizeActionOnSelectedItems();
        isDelete && this.props.deleteData(selectedItems);
    }
}

const mapStateToProps = (state) => ({
    ...state.tables.reports,
    items: state.reports,
    episodes: state.episodes,
    shows: state.shows,
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
    ...getTableActions("reports"),
    ...getDataActions("reports"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
