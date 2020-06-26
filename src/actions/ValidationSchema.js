import joi from "@hapi/joi";
import {
	getRates,
	getShowStatus,
	getAnimeSource,
	getAnimeStudios,
	getAudioType,
	getRawTypes,
} from "../components/services/fakeShowsInfoServices";

export const schema = {
	id: joi.number().integer().min(1),
	type: joi.allow("movie", "anime", "tvshow").empty("").required(),
	name: joi.string().required().empty("").label("Show Name"),
	another_name: joi.string().empty(""),
	genres: joi.array().min(1).required().label("Genres"),
	release_year: joi
		.number()
		.integer()
		.min(1800)
		.required()
		.label("Release Year"),
	score: joi.number().min(1).max(10).empty("").required().label("Score"),
	rate: joi
		.any()
		.allow(...getRates().map((rate) => rate.value))
		.required(),
	duration: joi
		.string()
		.pattern(/^\s*(\d+\s?hours?)?\s*\d+\s?min(ute)?s?\s*$/)
		.empty("")
		.label("Duration"),
	season: joi.number().integer().min(1).empty("").label("Season No"),
	episodes: joi.number().integer().min(1).empty("").label("Episodes No"),
	status: joi
		.any()
		.allow(...getShowStatus().map((status) => status.value))
		.required(),
	source: joi.any().allow(...getAnimeSource().map((source) => source.value)),
	studio: joi
		.any()
		.allow("n/a", ...getAnimeStudios().map((studio) => studio.value)),
	related_shows: joi.array().items(joi.string()),
	release_date: joi
		.string()
		.empty("")
		.pattern(/^\s*\d{4}-\d{2}-\d{2}\s*$/),
	aired_from: joi
		.string()
		.empty("")
		.pattern(/^\s*\d{4}-\d{2}-\d{2}\s*$/),
	aired_to: joi
		.string()
		.empty("")
		.pattern(/^\s*\d{4}-\d{2}-\d{2}\s*$/),
	story: joi.string().required(),
	imdb_link: joi.string().uri().empty(""),
	mal_link: joi.string().uri().empty(""),
	poster: joi.object().empty("").label("Poster Image").required(),
	background: joi.object().empty("").label("Background Image").required(),
	square_image: joi.object().empty("").label("Square Image"),
	trailer_link: joi.string().uri().empty("").label("Trailer Link"),
	tags: joi.array(),
	published: joi.allow("0", "1").required(),
	reviews_enabled: joi.allow("0", "1").required(),
	author: joi.number().integer().positive().required(),
	keywords: joi.string().max(500).empty(""),
	description: joi.string().max(255).empty(""),
	gallery: joi.array(),
	arcs: joi.object(),
	watching_servers: joi.array().items(
		joi
			.object({
				id: joi.number().integer(),
				name: joi.string().empty(""),
				code: joi.string().empty(""),
				files: joi.object().empty({}),
			})
			.with("code", "name")
			.with("files", "name")
	),
	video_files: joi.array().items(
		joi.object({
			raw_type: joi.allow(...getRawTypes().map((raw) => raw.value)),
			resolution: joi.number().integer().positive(),
			size: joi.string().empty(""),
			audio: joi.allow(...getAudioType().map((audio) => audio.value)),
			language: joi.string().empty("").default("English"),
			subtitle: joi.string().empty(""),
			translator: joi.string().empty(""),
			download_servers: joi.array().items(
				joi
					.object({
						name: joi.string().empty("").label("Server Name"),
						link: joi
							.string()
							.uri()
							.empty("")
							.label("Download Link"),
						file: joi.object().empty(null).label("Video File"),
					})
					.empty({})
					.with("link", "name")
					.with("file", "name")
			),
		})
	),
};

export const nestedSchema = {
	watching_servers_name: joi.string(),
	watching_servers_code: joi.string(),
	video_files_raw_type: joi.string(),
	video_files_resolution: joi.number().integer().positive(),
	video_files_size: joi.string().empty(""),
	video_files_audio: joi.allow(...getAudioType().map((audio) => audio.value)),
	video_files_language: joi.string().empty(""),
	video_files_subtitle: joi.string().empty(""),
	video_files_translator: joi.string().empty(""),
	video_files_download_servers_name: joi.string(),
	video_files_download_servers_link: joi.string().uri(),
	arcs_form_no: joi.number().integer().positive().min(1),
	arcs_form_name: joi.string().empty(""),
};
