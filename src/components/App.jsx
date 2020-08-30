import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { appActions } from "../actions/AppActions";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Content from "./Content";
import "promise-polyfill/src/polyfill";

class App extends Component {
	componentDidMount() {
		const { onUserLogin, loadAppData } = this.props;

		onUserLogin({
			id: 21,
			profileImage: `${process.env.HOSTNAME}/media/profile_images/profile_image_21.jpg`,
			username: "mustafa",
			name: "Mustafa Admin",
			role: "admin",
		});

		loadAppData();
	}

	render() {
		return (
			<Fragment>
				<TopBar user={this.props.loggedUser} />
				<SideBar />
				<Content />
			</Fragment>
		);
	}
}

export default connect((state) => state, appActions)(App);
