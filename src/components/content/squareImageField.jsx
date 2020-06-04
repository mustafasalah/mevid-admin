import React from "react";
import FormField from "../common/form/FormField";

const SquareImageField = () => {
	return (
		<div className="row">
			<div className="col-5-2">
				<span
					id="show-square-image-preview"
					className="empty image blur-shadow radius"
				></span>
			</div>
			<div className="col-5-3">
				<div className="show-image-uploader">
					<input
						type="file"
						id="show-square-image"
						name="show-square-image"
					/>
					<label
						htmlFor="show-square-image"
						className="primary-btn upload-btn radius focus-shadow"
					>
						Upload
					</label>
					<span>OR</span>
					<FormField
						type="url"
						name="show.square_image"
						label=""
						placeholder="Square Image Url here..."
						unwrappedField
					/>
				</div>
			</div>
		</div>
	);
};

export default SquareImageField;
