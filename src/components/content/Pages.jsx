import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getPages from "../services/pagesServices";
import text from "../../langs/lang";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Pages extends AbstractTablePage {
    tableId = "pages-table";

    tableColumns = [
        {
            dataProp: "title",
            label: text("page_title"),
            haveSort: true,
            classNames: "primary-col",
            type: "link",
            externalLink: true,
            href: `${HOSTNAME}/pages/:id`,
            linksNav: [
                {
                    label: text("view"),
                    className: "view-item",
                    href: `${HOSTNAME}/pages/:id`,
                    absolute: true,
                },
                {
                    label: text("edit"),
                    className: "edit-item",
                    href: "/pages/:id",
                },
                {
                    label: text("delete"),
                    className: "delete-item",
                    href: "#delete-page-:id",
                    onClick: ({ id }) => {
                        const isDelete = window.confirm(
                            text("are_you_sure_to_delete_this_page")
                        );
                        isDelete && this.props.deleteData(id);
                    },
                },
            ],
        },
        {
            dataProp: "author",
            label: text("author"),
            classNames: "more-padding",
            haveSort: true,
            type: "custom",
            render: ({ author, authorId }) => (
                <a href={`${HOSTNAME}/user/${authorId}`}>{author}</a>
            ),
        },
        {
            dataProp: "status",
            label: text("status"),
            haveSort: true,
            type: "custom",
            render: ({ status }) => text(status),
        },
        {
            dataProp: "publishDate",
            label: text("submitted_on"),
            haveSort: true,
            type: "text",
        },
        {
            dataProp: "views",
            label: text("views"),
            haveSort: true,
            type: "text",
        },
    ];

    filtersData = {
        status: [
            { label: text("published"), value: "published" },
            { label: text("drafted"), value: "drafted" },
        ],
    };

    actions = [
        {
            value: "delete",
            label: text("delete"),
            handler: this.handleDelete.bind(this),
        },
        {
            value: "draft",
            label: text("make_a_draft"),
            handler: this.handleStatusChange.bind(this, "draft"),
        },
        {
            value: "publish",
            label: text("publish"),
            handler: this.handleStatusChange.bind(this, "publish"),
        },
    ];

    sectionHeader = (
        <SectionHeader
            name={text("pages")}
            faClass="fas fa-copy"
            link={{ label: text("new_page"), href: "/pages/new" }}
        />
    );

    constructor(props) {
        super(props);
        this.getData = getPages;
    }

    handleDelete() {
        const isDelete = window.confirm(
            text("are_you_sure_to_delete_the_selected_pages")
        );
        isDelete && this.props.deleteData(this.props.selectedItems);
    }

    handleStatusChange(status) {
        this.props.changeStatus(this.props.selectedItems, status);
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
