import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "./../components/services/httpServices";
import {
	getRates,
	getShowStatus,
	getAnimeSource,
	getAnimeStudios,
	getAudioType,
	getRawTypes,
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
		.pattern(/^\s*\d+\s?min(ute)?s?(\s+\d+\s?hours?)?\s*$/i)
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
	imdb_url: joi.string().uri().empty(""),
	mal_url: joi.string().uri().empty(""),
	poster: joi.string().uri().required(),
	background: joi.string().uri().required(),
	square_image: joi.string().uri().empty(""),
	trailer_url: joi.string().uri().empty(""),
	tags: joi.array(),
	publish_status: joi.allow("0", "1").required(),
	author: joi.string().empty("").required(),
	keywords: joi.string().max(500).empty(""),
	description: joi.string().max(255).empty(""),
	arcs: joi.object(),
	watching_servers: joi.array().items(
		joi
			.object({
				name: joi.string().empty(""),
				code: joi.string().empty(""),
			})
			.with("name", "code")
	),
	video_files: joi.array().items(
		joi.object({
			raw_type: joi.allow(...getRawTypes().map((raw) => raw.value)),
			resolution: joi.number().integer().positive(),
			size: joi.string().empty(""),
			audio: joi.allow(...getAudioType().map((audio) => audio.value)),
			language: joi.string().empty("").default("english"),
			subtitle: joi.string().empty(""),
			translater: joi.string().empty(""),
			download_servers: joi.array().items(
				joi
					.object({
						name: joi.string().empty(""),
						link: joi.string().uri().empty(""),
					})
					.with("name", "link")
			),
		})
	),
};

const nestedSchema = {
	watching_servers_name: joi.string(),
	watching_servers_code: joi.string(),
	video_files_raw_type: joi.string(),
	video_files_resolution: joi.number().integer().positive(),
	video_files_size: joi.string().empty(""),
	video_files_audio: joi.allow(...getAudioType().map((audio) => audio.value)),
	video_files_language: joi.string().empty(""),
	video_files_subtitle: joi.string().empty(""),
	video_files_translater: joi.string().empty(""),
	video_files_download_servers_name: joi.string(),
	video_files_download_servers_link: joi.string().uri(),
	arcs_form_no: joi.number().integer().positive().min(1),
	arcs_form_name: joi.string().empty(""),
};

const showFormActions = {
	onFormSubmit: (showType, data) => {
		const { value, error } = joi.object(schema).validate(data);

		if (!error) {
			http.post(`${showType}/`, value)
				.then((res) => {
					toast.success("the Data have been saved!");
					console.log(res.data);
					return { type: ACTIONS.SUBMIT_FORM, error: null };
				})
				.catch((ex) => {
					console.log(ex);
					toast.error(ex);
					return {
						type: ACTIONS.SUBMIT_FORM,
						error: ex,
					};
				});
		} else {
			toast.error(error.toString());
		}

		return { type: ACTIONS.SUBMIT_FORM };
	},
	onFieldChanged: (fieldName, fieldValue) => {
		const { value, error } = { ...schema, ...nestedSchema }[
			fieldName.replace(/\d+\.?/g, "").replace(/\./g, "_")
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
