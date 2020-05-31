import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { appActions } from "../actions/AppActions";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Content from "./Content";

class App extends Component {
	componentDidMount() {
		const { onUserLogin, loadAppData } = this.props;

		onUserLogin({
			id: 1,
			name: "Mustafa Salah",
			role: "adminstrator",
			profileImage: "/assets/images/slider1.jpg",
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
