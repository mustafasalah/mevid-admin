// const showData = {
// 	type: "movie",
// 	name: "The King of West",
// 	another_name: "ملك الغرب",
// 	genres: ["action", "fantasy"],
// 	release_year: "2020",
// 	score: "7",
// 	rate: "r+",
// 	duration: "1 hour 45 minutes",
// 	season: "",
// 	episodes: "",
// 	status: "a",
// 	source: "manga",
// 	studio: "n/a",
// 	related_shows: [4],
// 	release_date: "2020-06-12",
// 	aired_from: "",
// 	aired_to: "",
// 	story:
// 		"the king of West need power to get rid of eval people in his kingdom!",
// 	imdb_link: "http://www.imdb.com",
// 	mal_link: "",
// 	poster: {
// 		name: "The_King_of_West_poster.jpg",
// 		size: "948347",
// 		url: "/assets/images/anime6.jpg",
// 	},
// 	background: {
// 		name: "The_King_of_West_background.jpg",
// 		size: "5548347",
// 		url: "/assets/images/strange.jpg",
// 	},
// 	square_image: {
// 		name: "The_King_of_West_square_image.jpg",
// 		size: "848745",
// 		url: "/assets/images/slider1.jpg",
// 	},
// 	trailer_link: "https://www.youtube.com",
// 	tags: ["HBO Shows"],
// 	published: 1,
// 	reviews_enabled: 1,
// 	author: 23,
// 	keywords: "movie,action,drama,best movie 2020",
// 	description:
// 		"download and watch the king of west in 1080p bluray for free!",
// 	gallery: [
// 		{ url: "/assets/images/gallery/1.jpg" },
// 		{ url: "/assets/images/gallery/2.jpg" },
// 		{ url: "/assets/images/gallery/3.jpg" },
// 		{ url: "/assets/images/gallery/4.jpg" },
// 		{ url: "/assets/images/gallery/5.jpg" },
// 	],
// 	arcs: {
// 		form: {
// 			id: "",
// 			key: "",
// 			no: "",
// 			name: "",
// 		},
// 		list: [],
// 	},
// 	watching_servers: [
// 		{
// 			id: 0,
// 			name: "MEVid Server",
// 			files: {
// 				"1080P": { id: "1" },
// 				"720P": { id: "2" },
// 				"360P": { id: "3" },
// 			},
// 		},
// 		{ id: 1, name: "Google Drive", code: "code here..." },
// 		{ id: 2, name: "UptoBox", code: "uptobox code here..." },
// 	],
// 	video_files: [
// 		{
// 			raw_type: "blu-ray",
// 			resolution: "1080",
// 			size: "1.9GB",
// 			audio: "FLAC",
// 			language: "English",
// 			subtitle: "Arabic",
// 			translator: "HeroKan",
// 			download_servers: [
// 				{
// 					name: "Direct Link",
// 					file: {
// 						id: "1",
// 						name: "The_king_of_west_[BLU-RAY]_[1080P].mp4",
// 						size: "1924000000",
// 					},
// 				},
// 				{ name: "google drive", link: "https://drive.google.com/" },
// 				{ name: "mega", link: "https://mega.co.nz/" },
// 			],
// 		},
// 		{
// 			raw_type: "blu-ray",
// 			resolution: "720",
// 			size: "1.1GB",
// 			audio: "AAC",
// 			language: "English",
// 			subtitle: "",
// 			translator: "",
// 			download_servers: [
// 				{
// 					name: "Direct",
// 					file: {
// 						id: "3",
// 						name: "The_king_of_west_[BLU-RAY]_[720P].mp4",
// 						size: "1129000000",
// 					},
// 				},
// 				{ name: "samaup", link: "https://www.samaup.com/" },
// 				{ name: "onedrive", link: "https://www.onedrive.com/" },
// 			],
// 		},
// 	],
// };

import http from "./httpServices";

export async function getShowArcs(show_id) {
	const repsonse = await http.get(`/arcs/${show_id}`);
	return repsonse.data;
}

export async function getShowData(id) {
	const response = await http.get(`/shows/${id}`);
	return response.data;
}
