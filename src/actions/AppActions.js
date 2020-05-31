import * as ACTIONS from "./ActionTypes";
import getShows from "./../components/services/fakeShowsServices";
import getComments from "./../components/services/fakeCommentsServices";
import getReviews from "./../components/services/fakeReviewsServices";
import getPages from "./../components/services/fakePagesServices";
import getUsers from "./../components/services/fakeUsersServices";
import getEpisodes from "./../components/services/fakeEpisodesServices";

export const appActions = {
	onUserLogin: (loggedUser) => ({
		type: ACTIONS.LOGIN_USER,
		loggedUser,
	}),
	loadAppData: () => {
		const appData = {
			shows: getShows(),
			episodes: getEpisodes(),
			comments: getComments(),
			reviews: getReviews(),
			pages: getPages(),
			users: getUsers(),
		};
		return { type: ACTIONS.LOAD_APP_DATA, appData };
	},
};
