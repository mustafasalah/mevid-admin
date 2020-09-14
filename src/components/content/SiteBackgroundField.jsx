import React, { Fragment } from "react";
import FormField from "../common/form/FormField";

const SiteBackgroundField = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-1 center">
					<span className="version">Light Version</span>
				</div>
				<div className="col-5-1">
					<span className="image blur-shadow radius light-bg"></span>
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

			<div className="row">
				<div className="col-1 center">
					<span className="version">Dark Version</span>
				</div>
				<div className="col-5-1">
					<span className="image blur-shadow radius dark-bg"></span>
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
		</Fragment>
	);
};

export default SiteBackgroundField;
