import React from "react";
import VideoFileInfo from "./VideoFileInfo";
import VideoFileDownload from "./VideoFileDownload";
import AddMoreBtn from "./AddMoreBtn";
import { connect } from "react-redux";

const VideoFileField = ({ videoNo, formName, forms }) => {
	return (
		<div className="row radius">
			<div className="col-1">
				<VideoFileInfo videoNo={videoNo} formName={formName} />
				{forms[formName].data.video_files[videoNo].download_servers.map(
					(server, i) => (
						<VideoFileDownload
							key={i}
							formName={formName}
							serverNo={i}
							videoNo={videoNo}
							isUpload={i === 0}
						/>
					)
				)}
				<AddMoreBtn
					label="More Links"
					formName={formName}
					listName={`video_files.${videoNo}.download_servers`}
				/>
			</div>
		</div>
	);
};

export default connect((state) => ({
	forms: state.forms,
}))(VideoFileField);
