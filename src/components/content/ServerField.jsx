import React from "react";
import FormField from "../common/form/FormField";

const ServerField = ({ serverNo, formName }) => {
	return (
		<div className="row">
			<div className="col-5-2">
				<FormField
					label="Server Name"
					name={`${formName}.watching_servers.${serverNo}.name`}
					type="text"
					placeholder="e.g. MEVid Server"
				/>
			</div>
			<div className="col-5-3">
				{serverNo === 0 ? (
					<div className="row">
						{["1440P", "1080P", "720P", "480P", "360P", "240P"].map(
							(res) => (
								<div key={res} className="col-3">
									<FormField
										label="Resolution"
										type="text"
										defaultValue={res}
										placeholder="e.g. MEVid Server"
										disabled
										htmlAfterField={
											<FormField
												label=" "
												labelClass="primary-btn upload-btn focus-shadow radius-3"
												type="file"
												accept="video/*"
												unwrappedField
											/>
										}
									/>
								</div>
							)
						)}
					</div>
				) : (
					<FormField
						label="Player Code"
						name={`${formName}.watching_servers.${serverNo}.code`}
						type="textarea"
						placeholder="iframe, embed or video tag"
					/>
				)}
			</div>
		</div>
	);
};

export default ServerField;
