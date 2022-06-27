import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getReviews from "./../services/reviewsServices";
import { authorize } from "./../../js/Utility";
import text from "../../langs/lang";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Reviews extends AbstractTablePage {
    tableId = "reviews-table";

    tableColumns = [
        {
            dataProp: "author",
            label: text("author"),
            haveSort: true,
            classNames: "more-padding primary-col",
            type: "link",
            externalLink: true,
            href: `${HOSTNAME}/user/:authorId`,
        },
        {
            dataProp: "content",
            label: text("review"),
            classNames: "align-start",
            haveSort: false,
            type: "text",
            render: ({ title }) => {
                return <h4>{title}</h4>;
            },
            linksNav: [
                {
                    label: text("approve"),
                    className: "approve-item",
                    href: "#approve-review-:id",
                    on: ({ status }) => status !== "approved",
                    onClick: ({ id }) => {
                        this.props.changeStatus([id], "approve");
                    },
                    permission: "supervisor",
                    customAuthorize: this.customAuthorize.bind(this),
                },
                {
                    label: text("unapprove"),
                    className: "unapprove-item",
                    href: "#unapprove-review-:id",
                    on: ({ status }) => status === "approved",
                    onClick: ({ id }) => {
                        this.props.changeStatus([id], "unapprove");
                    },
                    permission: "supervisor",
                    customAuthorize: this.customAuthorize.bind(this),
                },
                {
                    label: text("delete"),
                    className: "delete-item",
                    href: "#delete-review-:id",
                    onClick: ({ id }) => {
                        const isDelete = window.confirm(
                            "Are you sure to delete this review?"
                        );
                        isDelete && this.props.deleteData(id);
                    },
                    permission: "supervisor",
                    customAuthorize: this.customAuthorize.bind(this),
                },
            ],
        },
        {
            dataProp: "rate",
            label: text("the_rate"),
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
            label: text("show_name"),
            haveSort: true,
            classNames: "align-start primary-col",
            type: "custom",
            render: ({ showName, showId }) => (
                <a
                    href={`${HOSTNAME}/shows/${showId}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    {showName}
                </a>
            ),
        },
        {
            dataProp: "publishDate",
            label: text("submitted_on"),
            haveSort: true,
            type: "text",
        },
        {
            dataProp: "status",
            label: text("status"),
            haveSort: true,
            type: "custom",
            render({ status }) {
                return text(status);
            },
        },
    ];

    filtersData = {
        status: [
            { label: text("approved"), value: "approved" },
            { label: text("unapproved"), value: "unapproved" },
        ],
        rate: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
        ],
    };

    actions = [
        {
            value: "delete",
            label: text("delete"),
            handler: this.handleDelete.bind(this),
        },
        {
            value: "approve",
            label: text("approve"),
            handler: this.handleStatusChange.bind(this, "approve"),
        },
        {
            value: "unapprove",
            label: text("unapprove"),
            handler: this.handleStatusChange.bind(this, "unapprove"),
        },
    ];

    sectionHeader = (
        <SectionHeader name={text("reviews")} faClass="fas fa-star-half-alt" />
    );

    constructor(props) {
        super(props);
        this.getData = getReviews;
    }

    customAuthorize(review) {
        const showOfReview = this.getShowOfReview(review);
        return showOfReview.authorId === this.props.loggedUser.id;
    }

    getShowOfReview(review) {
        const { shows } = this.props;
        return shows.find((show) => show.id === review.showId);
    }

    authorizeActionOnSelectedItems() {
        let { selectedItems, items, loggedUser } = this.props;

        // filter the selectItem if the logged user is authorized to the action
        // with all selected items only his own items
        if (authorize(loggedUser.role, "supervisor") === false) {
            selectedItems = selectedItems.filter((id) => {
                const selectedReview = items.find((item) => item.id === id);
                const showOfReview = this.getShowOfReview(selectedReview);

                return showOfReview.authorId === loggedUser.id;
            });
        }

        return selectedItems;
    }

    handleDelete() {
        const isDelete = window.confirm(
            text("are_you_sure_to_delete_the_selected_reviews")
        );
        const selectedItems = this.authorizeActionOnSelectedItems();
        isDelete && this.props.deleteData(selectedItems);
    }

    handleStatusChange(status) {
        const selectedItems = this.authorizeActionOnSelectedItems();
        this.props.changeStatus(selectedItems, status);
    }
}

const mapStateToProps = (state) => ({
    ...state.tables.reviews,
    items: state.reviews,
    shows: state.shows,
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
    ...getTableActions("reviews"),
    ...getDataActions("reviews"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
