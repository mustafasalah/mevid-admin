import React from "react";
import FormField from "./../common/form/FormField";

const BackgroundField = () => {
	return (
		<div className="row">
			<div className="col-1">
				<span
					id="show-background-preview"
					className="empty image blur-shadow radius"
				></span>
			</div>
			<div className="col-1">
				<div className="show-image-uploader">
					<FormField
						type="file"
						name="show.background.file"
						label="Upload"
						labelClass="primary-btn upload-btn radius focus-shadow"
						accept="image/*"
						unwrappedField
						labelAfter
					/>
					<span>OR</span>
					<FormField
						type="url"
						name="show.background.url"
						label=""
						placeholder="Background Image Url here..."
						unwrappedField
					/>
				</div>
			</div>
		</div>
	);
};

export default BackgroundField;
