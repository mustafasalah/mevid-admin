import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { upperFirst } from "./../../js/Utility";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import getGenres from "./../services/getGenres";
import {
	getRates,
	getShowStatus,
	getAnimeSource,
	getAnimeStudios,
} from "./../services/fakeShowsInfoServices";
import getShows from "./../services/fakeShowsServices";
import AddMoreBtn from "./AddMoreBtn";
import ServerField from "./ServerField";
import VideoFileField from "./VideoFileField";
import FormSideSection from "./../common/form/FormSideSection";
import PosterField from "./PosterField";
import BackgroundField from "./BackgroundField";
import SquareImageField from "./SquareImageField";
import PublishFields from "./PublishFields";
import Gallery from "./Gallery";
import Arcs from "./Arcs";
import { connect } from "react-redux";
import showFormActions from "./../../actions/ShowFormActions";
import { getShowData } from "../services/fakeShowDataService";
import { toast } from "react-toastify";

const mapShowTypes = new Map([
	["movies", "movie"],
	["anime", "anime"],
	["tv-shows", "tvshow"],
	["movie", "movies"],
	["tvshow", "tv-shows"],
]);

const mapShowTypeToLabel = new Map([
	["movies", "Movie"],
	["anime", "Anime"],
	["tv-shows", "TV Show"],
]);

const ShowForm = ({
	shows,
	data,
	onSubmit,
	onChange,
	onTypeChange,
	onWatchVideoFileDelete,
	onShowImageDelete,
	onShowDataLoad,
}) => {
	const history = useHistory();
	const params = useParams();
	const showType = mapShowTypeToLabel.get(params.type);
	const showId = params.id && Number(params.id);

	if (
		showType === undefined ||
		(typeof showId === "number" && !Number.isInteger(showId))
	) {
		history.replace("/");
	}

	const isMovie = showType === "Movie",
		isAnime = showType === "Anime",
		isTVShow = showType === "TV Show";

	useEffect(() => {
		const currentShowType = mapShowTypes.get(params.type);
		if (data.type !== currentShowType) onTypeChange(currentShowType);
	}, [params.type]);

	useEffect(() => {
		(async () => {
			if (showId === undefined) return;
			try {
				const showData = await getShowData(showId);
				onShowDataLoad(showData);
				if (showData.type !== mapShowTypes.get(params.type)) {
					history.replace(
						`/shows/${mapShowTypes.get(showData.type)}/${showId}`
					);
				}
			} catch (ex) {
				console.log(ex);
				// toast.error("There is no show with this id: " + showId, {
				// 	autoClose: 2500,
				// 	onClose: () => history.goBack(),
				// });
			}
		})();
	}, []);

	return (
		<Fragment>
			<SectionHeader
				name={`New ${showType}`}
				faClass="fas fa-plus fa-sm"
			/>
			<form
				method="POST"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(data);
				}}
			>
				<div id="main-side">
					<FormSection header={`${showType} Information`}>
						<div className="row">
							<div className="col-3-2">
								<FormField
									name="show.name"
									label={`${showType} Name`}
									type="text"
									placeholder="e.g. The Pirates Of The Caribbean"
									required
								/>
							</div>
							<div className="col-3-1">
								<FormField
									name="show.genres"
									label="Genres"
									type="select"
									placeholder="Select Genres"
									options={getGenres(showType).map(
										(genre) => ({
											label: upperFirst(genre),
											value: genre,
										})
									)}
									multiple
									required
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-3-2">
								<FormField
									label="Another Name"
									placeholder="e.g. The name of the show in other language"
									name="show.another_name"
									type="text"
								/>
							</div>
							<div className="col-3-1">
								{isMovie ? (
									<FormField
										name="show.duration"
										className="time"
										label="Duration"
										type="text"
										placeholder="XX hours XX min or XX min"
									/>
								) : (
									<FormField
										name="show.season"
										label="Season No."
										type="number"
										min="1"
										placeholder="default: none"
									/>
								)}
							</div>
						</div>

						<div className="row">
							<div className="col-3-2">
								<div className="row">
									<div className="col-2">
										<FormField
											name="show.release_year"
											className="date"
											label="Release Year"
											type="number"
											placeholder="e.g. 2020"
											dateType="year"
											autoComplete="off"
											required
										/>
									</div>
									<div className="col-2">
										<FormField
											name="show.score"
											label="Score"
											type="number"
											placeholder="e.g. 9"
											style={{ width: 110 }}
											required
											htmlAfterField={
												<span className="appendix">
													of 10
												</span>
											}
										/>
									</div>
								</div>
							</div>

							<div className="col-3-1">
								<FormField
									name="show.rate"
									label="Rate"
									type="select"
									defaultValue="nr"
									options={getRates()}
								/>
							</div>
						</div>
						{!isMovie && (
							<div className="row">
								<div className="col-3-2">
									<div className="row">
										<div
											className={
												isAnime ? "col-3" : "col-2"
											}
										>
											<FormField
												name="show.episodes"
												label="Episodes No"
												type="number"
												placeholder="e.g. 12"
												min="0"
											/>
										</div>
										<div
											className={
												isAnime ? "col-3" : "col-2"
											}
										>
											<FormField
												name="show.status"
												label="Airing Status"
												type="select"
												options={getShowStatus()}
											/>
										</div>
										{isAnime && (
											<div className="col-3">
												<FormField
													name="show.source"
													label="Source Type"
													type="select"
													defaultValue="manga"
													options={getAnimeSource()}
												/>
											</div>
										)}
									</div>
								</div>
								<div className="col-3-1">
									{isAnime ? (
										<FormField
											name="show.studio"
											label="Studios"
											type="select"
											defaultValue="N/A"
											options={[
												{ label: "N/A", value: "n/a" },
												...getAnimeStudios(),
											]}
											tags
										/>
									) : (
										<FormField
											name="show.release_date"
											className="date"
											label="Release Date"
											type="text"
											dateType="date"
											autoComplete="off"
										/>
									)}
								</div>
							</div>
						)}
						<div className="row">
							<div className={isMovie ? "col-3-2" : "col-2"}>
								<FormField
									name="show.related_shows"
									className="shows"
									label="Related Shows"
									type="select"
									placeholder="Enter Related Shows..."
									options={shows.map((show) => ({
										label: show.name,
										value: show.id,
									}))}
									multiple
								/>
							</div>

							{isMovie ? (
								<div className="col-3-1">
									<FormField
										name="show.release_date"
										dateType="date"
										className="date"
										label="Release Date"
										type="text"
										autoComplete="off"
									/>
								</div>
							) : isAnime ? (
								<Fragment>
									<div className="col-2">
										<div className="row">
											<div className="col-2">
												<FormField
													name="show.aired_from"
													className="date"
													label="Aired from"
													type="text"
													autoComplete="off"
													dateType="date-from"
												/>
											</div>
											<div className="col-2">
												<FormField
													name="show.aired_to"
													className="date"
													label="Aired to"
													type="text"
													autoComplete="off"
													dateType="date-to"
												/>
											</div>
										</div>
									</div>
								</Fragment>
							) : (
								<div className="col-2">
									<FormField
										name="show.imdb_link"
										className="url"
										label="IMDB Link"
										type="url"
										placeholder="IMDB Link here..."
									/>
								</div>
							)}
						</div>
						<div className="row">
							<div className="col-1">
								<FormField
									name="show.story"
									label="Story"
									type="textarea"
									placeholder="Something about movie story here..."
									required
								/>
							</div>
						</div>
						{!isTVShow && (
							<div className="row">
								<div className="col-2">
									<FormField
										name="show.imdb_link"
										className="url"
										label="IMDB Link"
										type="url"
										placeholder="IMDB Link here..."
									/>
								</div>
								<div className="col-2">
									<FormField
										name="show.mal_link"
										className="url"
										label="MyAnimeList Link"
										type="url"
										placeholder="MyAnimeList Link here..."
									/>
								</div>
							</div>
						)}
					</FormSection>

					<FormSection
						header="Gallery"
						faClass="far fa-images"
						id="gallery"
					>
						<Gallery
							gallery={data.gallery}
							showName={data.name}
							onChange={onChange}
						/>
					</FormSection>

					{isMovie && (
						<Fragment>
							<FormSection
								header="Watching Servers"
								faClass="fas fa-video"
								id="watching"
							>
								{data.watching_servers.map((server, i) => (
									<ServerField
										key={i}
										serverNo={i}
										formName="show"
										handleDelete={onWatchVideoFileDelete}
										value={server}
									/>
								))}
								<AddMoreBtn
									label="Add More Servers"
									formName="show"
									listName="watching_servers"
								/>
							</FormSection>

							<FormSection
								header="Video Files and Download Link"
								faClass="far fa-file-video"
								id="video-files"
							>
								{data.video_files.map((video_file, i) => (
									<VideoFileField
										key={i}
										videoNo={i}
										formName="show"
									/>
								))}

								<AddMoreBtn
									label="Add More Videos"
									formName="show"
									listName="video_files"
								/>
							</FormSection>
						</Fragment>
					)}

					{isAnime && (
						<FormSection
							header="Anime Arcs"
							id="arcs"
							faClass="fas fa-folder"
						>
							<Arcs />
						</FormSection>
					)}
				</div>

				<div id="end-side">
					<FormSideSection
						label="Show Poster"
						id="show-poster-widget"
						required
					>
						<PosterField posterFile={data.poster} />
					</FormSideSection>

					<FormSideSection
						label="Show Background"
						id="show-background-widget"
						required
					>
						<BackgroundField backgroundFile={data.background} />
					</FormSideSection>

					<FormSideSection
						label="Square Image"
						id="show-square-image-widget"
					>
						<SquareImageField
							onDelete={onShowImageDelete}
							squareImageFile={data.square_image}
						/>
					</FormSideSection>

					<FormSideSection label="Trailer Link" id="trailer-link">
						<div className="row">
							<div className="col-1">
								<FormField
									type="url"
									name="show.trailer_link"
									placeholder="Enter YouTube Trailer Link here..."
									unwrappedField
									htmlAfterField={
										<small>
											you can also use any video sharing
											service like dailymotion
										</small>
									}
								/>
							</div>
						</div>
					</FormSideSection>

					<FormSideSection label="Tags" id="tags">
						<div className="row">
							<div className="col-1">
								<FormField
									type="select"
									name="show.tags"
									placeholder="Press 'enter' after any tag you write"
									options={[
										{
											label: "Best Anime 2016",
											value: "Best Anime 2016",
										},
										{
											label: "Summer Anime 2018",
											value: "Summer Anime 2018",
										},
										{
											label: "HBO Shows",
											value: "HBO Shows",
										},
									]}
									multiple
									tags
									unwrappedField
									htmlAfterField={
										<small>
											Used to group collection of shows
											together under certain name
										</small>
									}
								/>
							</div>
						</div>
					</FormSideSection>

					<FormSideSection label="Publish" id="publish">
						<PublishFields
							form="show"
							extraFields={[
								<FormField
									type="select"
									label="Reviews"
									name="show.reviews_enabled"
									options={[
										{ label: "Enable", value: 1 },
										{ label: "Disable", value: 0 },
									]}
								/>,
							]}
						/>
					</FormSideSection>
				</div>
			</form>
		</Fragment>
	);
};

export default connect(
	(state) => ({ ...state.forms.show, shows: state.shows }),
	{
		onSubmit: showFormActions.onFormSubmit,
		onChange: showFormActions.onFieldChanged,
		onTypeChange: showFormActions.onFormTypeChange,
		onWatchVideoFileDelete: showFormActions.onWatchVideoFileDelete,
		onShowImageDelete: showFormActions.onShowImageDelete,
		onShowDataLoad: showFormActions.onShowDataLoad,
	}
)(ShowForm);
