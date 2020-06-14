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
	name: joi.string().required().empty("").label("Show Name"),
	another_name: joi.string().empty(""),
	genres: joi.array().min(1).required().label("Genres"),
	release_year: joi
		.number()
		.integer()
		.min(1800)
		.required()
		.label("Release Year"),
	score: joi
		.number()
		.integer()
		.min(1)
		.max(10)
		.empty("")
		.required()
		.label("Score"),
	rate: joi
		.any()
		.allow(...getRates().map((rate) => rate.value))
		.required(),
	duration: joi
		.string()
		.pattern(/^\s*\d+\s?min(ute)?s?(\s+\d+\s?hours?)?\s*$/)
		.empty("")
		.label("Duration"),
	season_no: joi.number().integer().min(1).empty("").label("Season No"),
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
	poster: joi
		.object({
			url: joi.string().uri().empty("").label("Image Url"),
			file: joi.object().empty(null).label("Image File"),
		})
		.xor("url", "file")
		.label("Show Poster"),
	background: joi
		.object({
			url: joi.string().uri().empty("").label("Image Url"),
			file: joi.object().empty(null).label("Image File"),
		})
		.xor("url", "file"),
	square_image: joi.object({
		url: joi.string().uri().empty("").label("Image Url"),
		file: joi.object().empty(null).label("Image File"),
	}),
	trailer_link: joi.string().uri().empty("").label("Trailer Link"),
	tags: joi.array(),
	publish_status: joi.allow("0", "1").required(),
	reviews_enabled: joi.allow("0", "1").required(),
	author: joi.number().integer().positive().required(),
	keywords: joi.string().max(500).empty(""),
	description: joi.string().max(255).empty(""),
	gallery: joi.array(),
	arcs: joi.object(),
	watching_servers: joi.array().items(
		joi
			.object({
				name: joi.string().empty(""),
				code: joi.string().empty(""),
				files: joi.object().empty(null),
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

const nestedSchema = {
	poster_url: joi.string().uri().empty(""),
	background_url: joi.string().uri().empty(""),
	square_image_url: joi.string().uri().empty(""),
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

const handleFileUpload = ({ show_id, name }, value) => {
	const formData = new FormData();
	formData.append("show_name", name);

	value.poster.file && formData.append("poster_image", value.poster.file);

	value.background.file &&
		formData.append("background_image", value.background.file);

	value.square_image.file &&
		formData.append("square_image", value.square_image.file);

	http.post(`/shows/upload/${show_id}`, formData);
};

const handleGalleryUpload = ({ show_id, name }, images) => {
	const formData = new FormData();
	formData.append("show_name", name);

	for (let image of images) {
		formData.append("gallery_images[]", image);
	}

	http.post(`/shows/upload/${show_id}`, formData);
};

const handleVideoUpload = ({ show_id, name }, video) => {
	const formData = new FormData();

	formData.append("show_name", name);

	if ("download_servers" in video) {
		const { name: serverName, file: videoFile } = video.download_servers[0];

		formData.append(
			"video_info",
			JSON.stringify(video, (key, value) =>
				key === "download_servers" ? undefined : value
			)
		);
		formData.append("server_name", serverName);
		formData.append("video_file", videoFile);
	} else {
		formData.append("server_name", video.name);
		for (let res in video.files) {
			formData.append(res, video.files[res]);
		}
	}

	http.post(`/shows/upload/videos/${show_id}`, formData);
};

const showFormActions = {
	onFormSubmit: (showType, data) => {
		const { value, error } = joi.object(schema).validate(data);

		if (!error) {
			http.post(`/shows/${showType}/`, value)
				.then((res) => {
					toast.success("The show information have been saved!");

					// handle poster, background and square images upload process
					handleFileUpload(res.data, value);

					// handle gallery images upload process
					if (value.gallery.length) {
						handleGalleryUpload(res.data, value.gallery);
					}

					// handle watching videos upload process
					if ("files" in value.watching_servers[0]) {
						handleVideoUpload(res.data, value.watching_servers[0]);
					}

					// handle download videos upload process
					for (let video_file of value.video_files) {
						if (!("file" in video_file.download_servers[0]))
							continue;

						handleVideoUpload(res.data, video_file);
					}

					return { type: ACTIONS.SUBMIT_FORM, error: null };
				})
				.catch((ex) => {
					toast.error(ex.message);

					return {
						type: ACTIONS.SUBMIT_FORM,
						error: ex,
					};
				});
		} else {
			// alert validation error
			toast.error(error.message);
		}

		return { type: ACTIONS.SUBMIT_FORM, error };
	},

	onFieldChanged: (fieldName, fieldValue) => {
		let value, error;

		if (!(fieldValue instanceof File)) {
			({ value, error } = { ...schema, ...nestedSchema }[
				fieldName.replace(/\d+\.?/g, "").replace(/\./g, "_")
			].validate(fieldValue));
		} else {
			value = fieldValue;
		}
		return {
			type: ACTIONS.FORM_ADD,
			fieldName,
			fieldValue: value === undefined ? "" : value,
			error,
		};
	},
};

export default showFormActions;
