import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { appActions } from "../actions/AppActions";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Content from "./Content";
import getShows from "./../components/services/fakeShowsServices";
import getComments from "./../components/services/fakeCommentsServices";
import getReviews from "./../components/services/fakeReviewsServices";
import getPages from "./../components/services/fakePagesServices";
import getUsers from "./../components/services/fakeUsersServices";
import getEpisodes from "./../components/services/fakeEpisodesServices";

class App extends Component {
	async componentDidMount() {
		const { onUserLogin, loadAppData } = this.props;

		onUserLogin({
			id: 1,
			name: "Mustafa Salah",
			role: "adminstrator",
			profileImage: "/assets/images/slider1.jpg",
		});

		const appData = {
			shows: await getShows(),
			episodes: getEpisodes(),
			comments: getComments(),
			reviews: getReviews(),
			pages: getPages(),
			users: await getUsers(),
		};

		loadAppData(appData);
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
