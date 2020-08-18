export const listItemsDefaults = {
	watching_servers: { name: "", code: "" },
	video_files: {
		raw_type: "blu-ray",
		resolution: "1080",
		size: "",
		audio: "AAC",
		language: "",
		subtitle: "",
		translator: "",
		download_servers: [
			{ name: "", file: null },
			{ name: "", link: "" },
		],
	},
	"video_files.download_servers": { name: "", link: "" },
};

export default {
	data: {
		id: "",
		showId: "",
		title: "",
		episode_no: "",
		episode_arc: "none",
		duration: "",
		release_date: "",
		story: "",
		published: 1,
		comments_enabled: 1,
		author: "",
		keywords: "",
		description: "",
		watching_servers: [
			{ name: "", files: {} },
			{ name: "", code: "" },
		],
		video_files: [listItemsDefaults.video_files],
	},
	errors: {},
};
