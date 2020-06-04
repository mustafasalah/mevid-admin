import React, { Fragment } from "react";
import FormField from "../common/form/FormField";

const VideoFileDownload = ({ isUpload, formName, videoNo, serverNo }) => {
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
						label="Upload Video"
						type="file"
						htmlAfterField={
							<Fragment>
								<label
									htmlFor="upload-video-1"
									className="primary-btn upload-btn radius-3 focus-shadow"
								>
									Upload
								</label>
								<a
									href="#"
									className="delete-link"
									style={{ display: "none" }}
								>
									Delete Video
								</a>
							</Fragment>
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
