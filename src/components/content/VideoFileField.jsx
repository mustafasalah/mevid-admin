import React from "react";
import VideoFileInfo from "./VideoFileInfo";
import VideoFileDownload from "./VideoFileDownload";
import AddMoreBtn from "./AddMoreBtn";

const VideoFileField = () => {
	return (
		<div className="row radius">
			<div className="col-1">
				<VideoFileInfo />
				<VideoFileDownload isUpload />
				<VideoFileDownload />
				<VideoFileDownload />
				<AddMoreBtn label="More Links" />
			</div>
		</div>
	);
};

export default VideoFileField;
