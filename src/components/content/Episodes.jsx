import React, { Fragment } from "react";
import { connect } from "react-redux";
import getAuthors from "../services/authorsServices.js";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import text from "../../langs/lang.js";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Episodes extends AbstractTablePage {
    tableId = "episodes-table";

    tableColumns = [
        {
            dataProp: "showName",
            label: text("episode_info"),
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
                            <dt>{text("episode_no")}:</dt>
                            <dd>
                                <a
                                    href={`${HOSTNAME}/shows/${rowData.showId}/episodes/${rowData.episodeNo}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {`${text("the_episode")} ${rowData.episodeNo
                                        .toString()
                                        .padStart(2, "0")}` +
                                        (rowData.episodeTitle
                                            ? `: ${rowData.episodeTitle}`
                                            : "")}
                                </a>
                            </dd>

                            <dt>{text("show_name")}:</dt>
                            <dd>
                                <a
                                    href={`${HOSTNAME}/shows/${rowData.showId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {rowData.showName}
                                </a>
                            </dd>
                        </dl>
                        {renderLinksNav()}
                    </div>
                </Fragment>
            ),
            linksNav: [
                {
                    label: text("view"),
                    className: "view-item",
                    href: `${HOSTNAME}/shows/:showId/episodes/:episodeNo`,
                    absolute: true,
                },
                {
                    label: text("edit"),
                    className: "edit-item",
                    href: "/episodes/:id",
                    permission: "supervisor",
                },
                {
                    label: text("delete"),
                    className: "delete-item",
                    href: "#delete-:id",
                    onClick: ({ id }) => {
                        const isDelete = window.confirm(
                            text("are_you_sure_to_delete_this_episode")
                        );
                        isDelete && this.props.deleteData(id);
                    },
                    permission: "supervisor",
                },
            ],
        },
        {
            dataProp: "category",
            label: text("category"),
            haveSort: true,
            type: "custom",
            render: ({ category }) => text(category),
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
            dataProp: "comments",
            label: text("comments"),
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
        category: ["tvshow", "anime"],
        author: getAuthors().map((author) => author.name),
        status: ["published", "drafted"],
    };

    actions = [
        {
            value: "delete",
            label: text("delete"),
            handler: this.handleDelete.bind(this),
            permission: "supervisor",
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
            name={text("episodes")}
            link={{ href: "/episodes/add", label: text("new_episode") }}
        />
    );

    handleDelete() {
        const deleteEpisodes = window.confirm(
            text("are_you_sure_to_delete_the_selected_episodes")
        );
        const selectedItems = this.authorizeActionOnSelectedItems();
        deleteEpisodes && this.props.deleteData(selectedItems);
    }

    handleStatusChange(status) {
        const selectedItems = this.authorizeActionOnSelectedItems();
        this.props.changeStatus(selectedItems, status);
    }
}

const mapStateToProps = (state) => ({
    ...state.tables.episodes,
    items: state.episodes,
    loggedUser: state.loggedUser,
    settings: state.forms.settings.data,
});

const mapDispatchToProps = {
    ...getTableActions("episodes"),
    ...getDataActions("episodes"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
