import * as ACTIONS from "./ActionTypes";
import getShows from "./../components/services/showsServices";
import getComments from "./../components/services/fakeCommentsServices";
import getReviews from "./../components/services/fakeReviewsServices";
import getReports from "./../components/services/reportsServices";
import getPages from "../components/services/pagesServices";
import getUsers from "./../components/services/usersServices";
import getEpisodes from "./../components/services/episodesServices";
import auth from "./../components/services/authServices";

const loginUser = () => ({
	type: ACTIONS.LOGIN_USER,
	payload: auth(),
});

const loadAppData = (callback) => ({
	type: ACTIONS.LOAD_APP_DATA,
	payload: Promise.allSettled([
		getShows(),
		getEpisodes(),
		getComments(),
		getReviews(),
		getReports(),
		getPages(),
		getUsers(),
	]),
	meta: {
		callback,
	},
});

export const appActions = {
	loginUser,
	loadAppData,
};
