import React, { Fragment } from "react";
import FormField from "../common/form/FormField";

const FaviconField = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-5-1">
					<span className="image blur-shadow radius"></span>
				</div>
				<div className="col-5-4">
					<div id="favicon-btns">
						<FormField
							type="file"
							name="show.poster"
							label="Upload Image"
							labelClass="primary-btn upload-btn radius focus-shadow"
							accept="image/*"
							unwrappedField
							labelAfter
							htmlAfterField={
								<button className="dark-btn delete-btn radius focus-shadow">
									Delete
								</button>
							}
						/>
					</div>
				</div>
			</div>
			<div className="row note">
				<div className="col-1">
					<small>
						Note: Image ratio is 1:1 and supported formats are
						(.ico, .png or .gif)
					</small>
				</div>
			</div>
		</Fragment>
	);
};

export default FaviconField;
