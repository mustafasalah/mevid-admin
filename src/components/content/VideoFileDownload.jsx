import React, { Fragment } from "react";
import FormField from "../common/form/FormField";

const VideoFileDownload = ({
	isUpload,
	formName,
	videoNo,
	serverNo,
	videoFile,
	onVideoFileDelete,
}) => {
	const fieldNamePrefix = `${formName}.video_files.${videoNo}.download_servers.${serverNo}`;

	return (
		<div className="row">
			<div className="col-4-1">
				<FormField
					label="Server Name"
					name={`${fieldNamePrefix}.name`}
					type="text"
					placeholder="e.g. MEVid Server"
				/>
			</div>
			<div className="col-4-3">
				{isUpload ? (
					<FormField
						label="Video File"
						type="file"
						name={`${fieldNamePrefix}.file`}
						disabled={!!videoFile}
						htmlAfterField={
							videoFile ? (
								<Fragment>
									<button
										type="button"
										className="primary-btn delete-btn radius-3 focus-shadow"
										onClick={() => {
											const reply = window.confirm(
												"Are you sure you want to delete the video file?"
											);
											reply && onVideoFileDelete(videoNo);
										}}
									>
										Delete Video
									</button>
									<p className="video-file-name radius">
										{`${videoFile.name} / ${(
											videoFile.size / 1e6
										).toFixed(2)}MB`}
									</p>
								</Fragment>
							) : (
								(id) => (
									<label
										htmlFor={id}
										className="primary-btn upload-btn radius-3 focus-shadow"
									>
										Upload Video
									</label>
								)
							)
						}
					/>
				) : (
					<FormField
						className="url"
						name={`${fieldNamePrefix}.link`}
						label="Download Link"
						type="url"
						placeholder="e.g. https://drive.google.com/file/d/XXXXXXXXXXXXXXXXXXX/XXXXXXXXX"
					/>
				)}
			</div>
		</div>
	);
};

export default VideoFileDownload;
