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
					<input type="file" id="show-poster" name="show-poster" />
					<label
						htmlFor="show-poster"
						className="primary-btn upload-btn radius focus-shadow"
					>
						Upload
					</label>
					<span>OR</span>
					<FormField
						type="url"
						name="show.poster"
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
