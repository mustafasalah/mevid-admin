import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import AddMoreBtn from "./AddMoreBtn";
import ServerField from "./ServerField";
import VideoFileField from "./VideoFileField";
import FormSideSection from "./../common/form/FormSideSection";
import PublishFields from "./PublishFields";
import episodeFormActions from "./../../actions/EpisodeFormActions";
//import Loader from "./../common/Loader";

const EpisodeForm = ({ data, shows, onSubmit }) => {
	const history = useHistory();
	const params = useParams();
	const episodeId = params.id && Number(params.id);

	useEffect(() => {
		(async () => {
			if (episodeId === undefined) return;
			try {
				//const episodeData = await getShowData(episodeId);
				//onEpisodeDataLoad(episodeData);
			} catch (ex) {
				toast.error("There is no episode with this id: " + episodeId, {
					autoClose: 2500,
					onClose: () => history.goBack(),
				});
			}
		})();
	}, []);

	return (
		<Fragment>
			<SectionHeader name="New Episode" faClass="fas fa-plus fa-sm" />

			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(data, () => {
						history.push("/episodes/");
					});
				}}
			>
				<div id="main-side">
					<FormSection header="Episode Information">
						<div className="row">
							<div className="col-1">
								<FormField
									name="episode.show_id"
									label="Select Show"
									type="select"
									placeholder="Select Episode Show"
									options={shows.map((show) => ({
										label: show.name,
										value: show.id,
									}))}
									required
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-3-2">
								<FormField
									name="episode.title"
									label="Episode Title"
									type="text"
									placeholder="e.g. The Pirates Of The Caribbean"
								/>
							</div>
							<div className="col-3-1">
								<FormField
									name="episode.episode_no"
									label="Episode No"
									type="number"
									min="0"
									required
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-3-2">
								<div className="row">
									<div className="col-2">
										<FormField
											name="episode.duration"
											className="time"
											label="Duration"
											type="text"
											placeholder="XX hours XX min OR XX min"
										/>
									</div>
									<div className="col-2">
										<FormField
											name="episode.release_date"
											className="date"
											label="Release Date"
											type="text"
											dateType="date"
											autoComplete="off"
										/>
									</div>
								</div>
							</div>
							<div className="col-3-1">
								<FormField
									name="episode.episode_arc"
									label="Arc of Episode"
									type="select"
									placeholder="The arc of episode, if it have"
									options={[
										{
											label: "The Great island",
											value: "1",
										},
										{
											label: "The beign of the end",
											value: "2",
										},
									]}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-1">
								<FormField
									name="episode.story"
									label="Story"
									type="textarea"
									placeholder="Something about episode story here..."
								/>
							</div>
						</div>
					</FormSection>

					<FormSection
						header="Watching Servers"
						faClass="fas fa-video"
						id="watching"
					>
						{data.watching_servers.map((server, i) => (
							<ServerField
								key={i}
								serverNo={i}
								formName="episode"
								value={server}
							/>
						))}
						<AddMoreBtn
							label="Add More Servers"
							formName="episode"
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
								formName="episode"
							/>
						))}

						<AddMoreBtn
							label="Add More Videos"
							formName="episode"
							listName="video_files"
						/>
					</FormSection>
				</div>

				<div id="end-side">
					<FormSideSection label="Publish" id="publish">
						<PublishFields
							form="episode"
							submitLabel={data.id ? "Save Changes" : "Create"}
							extraFields={[
								<FormField
									type="select"
									label="Comments"
									name="episode.comments_enabled"
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
	(state) => ({ ...state.forms.episode, shows: state.shows }),
	{
		onSubmit: episodeFormActions.onFormSubmit,
		onWatchVideoPlayerDelete: episodeFormActions.onWatchVideoPlayerDelete,
		onWatchVideoFileDelete: episodeFormActions.onWatchVideoFileDelete,
		// onShowDataLoad: showFormActions.onShowDataLoad,
	}
)(EpisodeForm);
