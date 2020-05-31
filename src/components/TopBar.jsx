import React from "react";
import { Route } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import UserProfile from "./UserProfile";
import Notification from "./Notification";
import AddMenu from "./AddMenu";

const TopBar = ({ user }) => {
	return (
		<div id="top-bar">
			<div id="inner-wrapper" className="blur-shadow">
				<Route component={TopNavigation} />
				<div id="admin-btns">
					<AddMenu />
					<Notification />
					<UserProfile user={user} />
				</div>
			</div>
		</div>
	);
};

export default TopBar;
