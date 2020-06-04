import React, { Fragment } from "react";
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

const ShowForm = ({ showType, data, onSubmit }) => {
	const showTypeText = upperFirst(showType),
		isMovie = showType === "movie",
		isAnime = showType === "anime",
		isTVShow = showType === "tvshow";

	return (
		<Fragment>
			<SectionHeader
				name={`New ${showTypeText}`}
				faClass="fas fa-plus fa-sm"
			/>
			<form
				method="POST"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(showType, data);
				}}
			>
				<div id="main-side">
					<FormSection header={`${showTypeText} Information`}>
						<div className="row">
							<div className="col-3-2">
								<FormField
									name="show.name"
									label={`${showTypeText} Name`}
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
								<div className="row">
									<div className="col-3">
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
									<div className="col-3">
										<FormField
											name="show.score"
											label="Score"
											type="number"
											placeholder="e.g. 9"
											style={{ width: 85 }}
											required
											htmlAfterField={
												<span className="appendix">
													of 10
												</span>
											}
										/>
									</div>
									<div className="col-3">
										<FormField
											name="show.rate"
											label="Rate"
											type="select"
											defaultValue="nr"
											options={getRates()}
										/>
									</div>
								</div>
							</div>
							<div className="col-3-1">
								{isMovie ? (
									<FormField
										name="show.duration"
										className="time"
										label="Duration"
										type="text"
										placeholder="XXmin or XXmin XXhours"
									/>
								) : (
									<FormField
										name="show.season_no"
										label="Season No."
										type="number"
										min="1"
										placeholder="default: none"
									/>
								)}
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
												name="show.episodes_no"
												label="Episodes No"
												type="number"
												placeholder="e.g. 12"
												min="0"
												required
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
												required
											/>
										</div>
										{isAnime && (
											<div className="col-3">
												<FormField
													name="show.source_type"
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
											name="show.studios"
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
									options={getShows().map((show) => ({
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
										name="show.imdb_url"
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
										name="show.imdb_url"
										className="url"
										label="IMDB Link"
										type="url"
										placeholder="IMDB Link here..."
									/>
								</div>
								<div className="col-2">
									<FormField
										name="show.mal_url"
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
						<Gallery />
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
						<PosterField />
					</FormSideSection>

					<FormSideSection
						label="Show Background"
						id="show-background-widget"
						required
					>
						<BackgroundField />
					</FormSideSection>

					<FormSideSection
						label="Square Image"
						id="show-square-image-widget"
					>
						<SquareImageField />
					</FormSideSection>

					<FormSideSection label="Trailer Link" id="trailer-link">
						<div className="row">
							<div className="col-1">
								<FormField
									type="url"
									name="show.trailer_url"
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
											value: "1",
										},
										{
											label: "Summer Anime 2018",
											value: "2",
										},
										{ label: "HBO Shows", value: "3" },
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
						<PublishFields form="show" />
					</FormSideSection>
				</div>
			</form>
		</Fragment>
	);
};

export default connect((state) => state.forms.show, {
	onSubmit: showFormActions.onFormSubmit,
})(ShowForm);
