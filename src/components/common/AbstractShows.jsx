import React from "react";
import getAuthors from "../services/authorsServices";
import AbstractTablePage from "./AbstractTablePage";
import getGenres from "./../services/getGenres";
import text from "../../langs/lang";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class AbstractShows extends AbstractTablePage {
    tableColumns = [
        {
            dataProp: "poster",
            label: text("poster"),
            haveSort: false,
            type: "img",
            alt: ":name",
        },
        {
            dataProp: "name",
            label: text("show_name"),
            haveSort: true,
            classNames: "primary-col",
            type: "link",
            href: `${HOSTNAME}/shows/:id`,
            externalLink: true,
            linksNav: [
                {
                    label: text("view"),
                    className: "view-item",
                    href: `${HOSTNAME}/shows/:id`,
                    absolute: true,
                },
                {
                    label: text("edit"),
                    className: "edit-item",
                    href: "/shows/:id",
                    permission: "supervisor",
                },
                {
                    label: text("delete"),
                    className: "delete-item",
                    href: "#delete-:id",
                    onClick: ({ id }) => {
                        const isDelete = window.confirm(
                            text("are_you_sure_to_delete_this_show")
                        );
                        isDelete && this.props.deleteData(id);
                    },
                    permission: "supervisor",
                },
            ],
        },
        {
            dataProp: "author",
            label: text("author"),
            haveSort: true,
            type: "custom",
            render: ({ author, authorId }) => (
                <a href={`${HOSTNAME}/user/${authorId}`}>{author}</a>
            ),
        },
        {
            dataProp: "reviews",
            label: text("reviews"),
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
        {
            dataProp: "publishDate",
            label: text("publish_date"),
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
        genres: getGenres(this.constructor.name),
        author: getAuthors().map((author) => author.name),
        status: ["published", "drafted"],
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

    componentWillUpdate() {
        this.filtersData.author = getAuthors().map((author) => author.name);
    }

    handleDelete() {
        const deleteShows = window.confirm(
            text("are_you_sure_to_delete_the_selected_shows")
        );
        const selectedItems = this.authorizeActionOnSelectedItems();
        deleteShows && this.props.deleteData(selectedItems);
    }

    handleStatusChange(status) {
        const selectedItems = this.authorizeActionOnSelectedItems();
        this.props.changeStatus(selectedItems, status);
    }
}

export default AbstractShows;
