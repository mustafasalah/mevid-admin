import React from "react";
import FormField from "./../common/form/FormField";

const PosterField = () => {
	return (
		<div className="row">
			<div className="col-5-2">
				<span
					id="show-poster-preview"
					className="empty image blur-shadow radius"
				></span>
			</div>
			<div className="col-5-3">
				<div className="show-image-uploader">
					<FormField
						type="file"
						name="show.poster.file"
						label="Upload"
						labelClass="primary-btn upload-btn radius focus-shadow"
						accept="image/*"
						unwrappedField
						labelAfter
					/>
					<span>OR</span>
					<FormField
						type="url"
						name="show.poster.url"
						label=""
						placeholder="Poster Image Url here..."
						unwrappedField
					/>
				</div>
			</div>
		</div>
	);
};

export default PosterField;
