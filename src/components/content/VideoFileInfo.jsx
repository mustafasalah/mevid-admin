import React, { Fragment } from "react";
import FormField from "../common/form/FormField";
import { getRawTypes, getAudioType } from "./../services/fakeShowsInfoServices";

const VideoFileInfo = ({ videoFileNo = 0 }) => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-4">
					<FormField
						label="Raw Type"
						type="select"
						defaultValue="blu-ray"
						options={getRawTypes()}
						required
					/>
				</div>
				<div className="col-4">
					<FormField
						label="Resolution"
						type="select"
						defaultValue="1080"
						options={[
							{ label: "2160P", value: "2160" },
							{ label: "1440P", value: "1440" },
							{ label: "1080P", value: "1080" },
							{ label: "720P", value: "720" },
							{ label: "480P", value: "480" },
							{ label: "360P", value: "360" },
							{ label: "240P", value: "240" },
						]}
						required
					/>
				</div>
				<div className="col-4">
					<FormField
						label="Size"
						type="text"
						placeholder="e.g. 1.9GB"
					/>
				</div>
				<div className="col-4">
					<FormField
						label="Audio"
						type="select"
						defaultValue="AAC"
						options={getAudioType()}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-3">
					<FormField
						label="Language"
						type="text"
						placeholder="default: English"
					/>
				</div>
				<div className="col-3">
					<FormField
						label="Subtitle"
						type="text"
						placeholder="default: none"
					/>
				</div>
				<div className="col-3">
					<FormField
						label="Translater"
						type="text"
						placeholder="default: none"
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default VideoFileInfo;
