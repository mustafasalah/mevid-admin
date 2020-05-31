import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import {
	getRates,
	getShowStatus,
	getAnimeSource,
	getAnimeStudios,
	getAudioType,
} from "../components/services/fakeShowsInfoServices";

const schema = {
	name: joi.string().required().empty(""),
	genres: joi.array().min(1).required(),
	release_year: joi.number().integer().min(1800).required(),
	score: joi.number().integer().min(1).max(10).required(),
	rate: joi
		.any()
		.allow(...getRates().map((rate) => rate.value))
		.required(),
	duration: joi
		.string()
		.pattern(/^\s*\d+\s?min(utes?)?(\s+\d+\s?hours?)?\s*$/i)
		.empty(""),
	season_no: joi.number().integer().min(1).empty(""),
	episodes_no: joi.number().integer().min(1).empty(""),
	status: joi
		.any()
		.allow(...getShowStatus().map((status) => status.value))
		.required(),
	source_type: joi
		.any()
		.allow(...getAnimeSource().map((source) => source.value)),
	studios: joi
		.any()
		.allow("n/a", ...getAnimeStudios().map((studio) => studio.value)),
	related_shows: joi.array().items(joi.string()),
	release_date: joi.string().pattern(/^\s*\d{4}-\d{2}-\d{2}\s*$/),
	aired_from: joi.string().pattern(/^\s*\d{4}-\d{2}-\d{2}\s*$/),
	aired_to: joi.string().pattern(/^\s*\d{4}-\d{2}-\d{2}\s*$/),
	story: joi.string().required(),
	imdb_url: joi.string().uri(),
	mal_url: joi.string().uri(),
	poster: joi.string().uri(),
	background: joi.string().uri(),
	square_image: joi.string().uri(),
	trailer_url: joi.string().uri(),
	tags: joi.array(),
	publish_status: joi.allow("0", "1").required(),
	author: joi.string().empty("").required(),
	keywords: joi.string().max(500),
	description: joi.string().max(255),
	watching_servers_name: joi.string().required(),
	watching_servers_code: joi.string().required(),
	video_files_raw_type: joi.string().empty("").required(),
	video_files_resolution: joi.number().integer().positive().required(),
	video_files_size: joi.string(),
	video_files_audio: joi.allow(...getAudioType().map((audio) => audio.value)),
	video_files_language: joi.string(),
	video_files_subtitle: joi.string(),
	video_files_translater: joi.string(),
	video_files_download_servers_name: joi.string().required(),
	video_files_download_servers_link: joi.string().uri().required(),
};

const showFormActions = {
	onFieldChanged: (fieldName, fieldValue) => {
		const { value, error } = schema[
			fieldName.replace(/\d+\.?/g, "").replace(".", "_")
		].validate(fieldValue);

		return {
			type: ACTIONS.FORM_ADD,
			fieldName,
			fieldValue: value === undefined ? "" : value,
			error,
		};
	},
};

export default showFormActions;
