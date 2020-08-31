import * as ACTIONS from "./ActionTypes";
import getShows from "./../components/services/showsServices";
import getComments from "./../components/services/fakeCommentsServices";
import getReviews from "./../components/services/fakeReviewsServices";
import getPages from "../components/services/pagesServices";
import getUsers from "./../components/services/fakeUsersServices";
import getEpisodes from "./../components/services/episodesServices";

const onUserLogin = (loggedUser) => ({
	type: ACTIONS.LOGIN_USER,
	loggedUser,
});

const loadAppData = () => ({
	type: ACTIONS.LOAD_APP_DATA,
	payload: Promise.allSettled([
		getShows(),
		getEpisodes(),
		getComments(),
		getReviews(),
		getPages(),
		getUsers(),
	]),
});

export const appActions = {
	onUserLogin,
	loadAppData,
};
