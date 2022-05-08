import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getUsers from "./../services/usersServices";
import text from "../../langs/lang";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Users extends AbstractTablePage {
    tableId = "users-table";

    tableColumns = [
        {
            dataProp: "profileImage",
            label: text("avatar"),
            haveSort: false,
            type: "custom",
            render: (rowData) => (
                <span
                    className="avatar focus-shadow"
                    style={{
                        backgroundImage: `url('${rowData.profileImage}')`,
                    }}
                ></span>
            ),
        },
        {
            dataProp: "username",
            label: text("username"),
            haveSort: true,
            classNames: "primary-col",
            type: "link",
            externalLink: true,
            href: `${HOSTNAME}/user/:id`,
            linksNav: [
                {
                    label: text("view"),
                    className: "view-item",
                    href: `${HOSTNAME}/user/:id`,
                    absolute: true,
                },
                {
                    label: text("edit"),
                    className: "edit-item",
                    href: "/users/:id",
                },
                {
                    label: text("activate"),
                    href: "#activate-user-:id",
                    on: ({ status }) => status !== "active",
                    onClick: ({ id }) => {
                        this.props.changeStatus([id], "active");
                    },
                },
                {
                    label: text("ban"),
                    href: "#ban-user-:id",
                    on: ({ status }) => status === "active",
                    onClick: ({ id }) => {
                        this.props.changeStatus([id], "ban");
                    },
                },
            ],
        },
        {
            dataProp: "email",
            label: text("email"),
            haveSort: true,
            type: "text",
        },
        {
            dataProp: "name",
            label: text("name"),
            haveSort: true,
            type: "text",
        },
        {
            dataProp: "role",
            label: text("role"),
            haveSort: true,
            type: "custom",
            render: ({ role }) => text(role),
        },
        {
            dataProp: "status",
            label: text("status"),
            haveSort: true,
            type: "custom",
            render: ({ status }) => text(status),
        },
        {
            dataProp: "showsNo",
            label: text("shows"),
            haveSort: true,
            type: "text",
        },
    ];

    filtersData = {
        status: ["active", "banned"],
        role: ["admin", "supervisor", "user"],
    };

    actions = [
        {
            value: "delete",
            label: text("delete"),
            handler: this.handleDelete.bind(this),
        },
        {
            value: "active",
            label: text("activate"),
            handler: this.handleStatusChange.bind(this, "active"),
        },
        {
            value: "ban",
            label: text("ban"),
            handler: this.handleStatusChange.bind(this, "ban"),
        },
    ];

    sectionHeader = (
        <SectionHeader
            name={text("users")}
            faClass="fas fa-users"
            link={{ href: "/users/new", label: text("new_user") }}
        />
    );

    constructor(props) {
        super(props);
        this.getData = getUsers;
    }

    handleDelete() {
        const isDelete = window.confirm(
            text("are_you_sure_to_delete_the_selected_users")
        );
        isDelete && this.props.deleteData(this.props.selectedItems);
    }

    handleStatusChange(status) {
        this.props.changeStatus(this.props.selectedItems, status);
    }
}

const mapStateToProps = (state) => ({
    ...state.tables.users,
    items: state.users,
});

const mapDispatchToProps = {
    ...getTableActions("users"),
    ...getDataActions("users"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
