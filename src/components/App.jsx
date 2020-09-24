import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { appActions } from "../actions/AppActions";
import { loadNotifications } from "./../actions/NotificationsActions";
import SettingsActions from "../actions/SettingsActions";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Content from "./Content";
import Loader from "./common/Loader";
import "promise-polyfill/src/polyfill";

class App extends Component {
	componentDidMount() {
		const {
			loginUser,
			loadAppData,
			loadNotifications,
			loadAppSettings,
		} = this.props;

		loginUser().then(() => {
			loadAppSettings();
			loadAppData(() => {
				loadNotifications();
			});
		});
	}

	render() {
		return this.props.loggedUser.id ? (
			<Fragment>
				<TopBar user={this.props.loggedUser} />
				<SideBar />
				<Content />
			</Fragment>
		) : (
			<Loader />
		);
	}
}

export default connect((state) => state, {
	...appActions,
	loadNotifications,
	loadAppSettings: SettingsActions.onSettingsDataLoad,
})(App);
