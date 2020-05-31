import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getUsers from "./../services/fakeUsersServices";

class Users extends AbstractTablePage {
	tableId = "users-table";

	tableColumns = [
		{
			dataProp: "profileImage",
			label: "Avatar",
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
			label: "Username",
			haveSort: true,
			classNames: "primary-col",
			type: "link",
			href: "/users/:id",
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: "/users/:id",
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/users/edit/:id",
				},
			],
		},
		{
			dataProp: "email",
			label: "Email",
			haveSort: true,
			type: "text",
		},
		{
			dataProp: "name",
			label: "Name",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "role", label: "Role", haveSort: true, type: "text" },
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
		{ dataProp: "showsNo", label: "Shows", haveSort: true, type: "text" },
	];

	filtersData = {
		status: ["active", "banned"],
		role: ["adminstrator", "supervisor", "user"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
		},
		{
			value: "active",
			label: "Active",
			handler: this.handleStatusChange.bind(this, "active"),
		},
		{
			value: "ban",
			label: "Ban",
			handler: this.handleStatusChange.bind(this, "ban"),
		},
	];

	sectionHeader = (
		<SectionHeader
			name="Users"
			faClass="fas fa-users"
			link={{ href: "/users/new", label: "New User" }}
		/>
	);

	constructor(props) {
		super(props);
		this.getData = getUsers;
	}

	handleDelete() {
		console.log(this.props.selectedItems, " Deleted!");
	}

	handleStatusChange(status) {
		console.log(this.props.selectedItems, " Changed to " + status + "!");
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
