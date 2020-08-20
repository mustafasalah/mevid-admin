import * as ACTIONS from "./ActionTypes";
import getEpisodes from "../components/services/fakeEpisodesServices";
import getShows from "../components/services/fakeShowsServices";
import store from "../store";

export const updateList = async (listType) => {
	let items;

	switch (listType) {
		case "shows":
			items = await getShows();
			break;

		case "episodes":
			items = await getEpisodes();
			break;

		default:
			items = [];
	}

	store.dispatch({
		type: ACTIONS.LOAD_DATA,
		dataType: listType,
		data: items,
	});
};

export const onWatchVideoFileDelete = (formType, resolution) => {
	return {
		type: ACTIONS.DELETE_WATCH_VIDEO_FILE,
		resolution,
		formType,
	};
};

export const onWatchVideoPlayerDelete = (formType, serverNo) => {
	return {
		type: ACTIONS.DELETE_WATCH_SERVER,
		serverNo,
		formType,
	};
};

export const onVideoFileDelete = (formType, videoNo) => {
	return {
		type: ACTIONS.DELETE_VIDEO_FILE,
		videoNo,
		formType,
	};
};
export const onVideoLinkDelete = (formType, videoInfoNo, serverNo) => ({
	type: ACTIONS.DELETE_VIDEO_LINK,
	videoInfoNo,
	serverNo,
	formType,
});

export const onVideoInfoDelete = (formType, videoInfoNo) => ({
	type: ACTIONS.DELETE_VIDEO_INFO,
	videoInfoNo,
	formType,
});
