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
					<input
						type="file"
						id="show-background"
						name="show-background"
					/>
					<label
						htmlFor="show-background"
						className="primary-btn upload-btn radius focus-shadow"
					>
						Upload
					</label>
					<span>OR</span>
					<FormField
						type="url"
						name="show.background"
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
