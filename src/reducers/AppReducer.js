import { combineReducers } from "redux";
import showsTableReducer from "./ShowsTableReducer";
import episodesTableReducer from "./EpisodesTableReducer";
import commentsTableReducer from "./CommentsTableReducer";
import reviewsTableReducer from "./ReviewsTableReducer";
import pagesTableReducer from "./PagesTableReducer";
import usersTableReducer from "./UsersTableReducer";
import loginReducer from "./LoginReducer";
import dataReducer from "./DataReducer";
import SchedulerReducer from "./SchedulerReducer";
import formReducer from "./FormReducer";
import notificationsReducer from "./NotificationsReducer";

const AppReducer = combineReducers({
	forms: combineReducers({
		show: formReducer("show"),
		episode: formReducer("episode"),
		page: formReducer("page"),
		user: formReducer("user"),
	}),
	schedule: SchedulerReducer,
	notifications: notificationsReducer,
	pages: dataReducer("pages"),
	episodes: dataReducer("episodes"),
	users: dataReducer("users"),
	comments: dataReducer("comments"),
	reviews: dataReducer("reviews"),
	shows: dataReducer("shows"),
	loggedUser: loginReducer,
	tables: combineReducers({
		shows: showsTableReducer("shows"),
		movies: showsTableReducer("movies"),
		animes: showsTableReducer("animes"),
		tvshows: showsTableReducer("tvshows"),
		episodes: episodesTableReducer,
		comments: commentsTableReducer,
		reviews: reviewsTableReducer,
		pages: pagesTableReducer,
		users: usersTableReducer,
	}),
});

export default AppReducer;
