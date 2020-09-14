import React, { Fragment } from "react";
import FormField from "../common/form/FormField";

const LogoField = () => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-1 center">
					<span className="version">Light Version</span>
				</div>
				<div className="col-1">
					<span className="image blur-shadow radius"></span>
				</div>
				<div className="col-1 center">
					<FormField
						type="file"
						name="show.poster"
						label="Upload Logo"
						labelClass="primary-btn upload-btn radius focus-shadow"
						accept="image/*"
						unwrappedField
						labelAfter
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-1 center">
					<span className="version">Dark Version</span>
				</div>
				<div className="col-1">
					<span className="image blur-shadow radius"></span>
				</div>
				<div className="col-1 center">
					<FormField
						type="file"
						name="show.poster"
						label="Upload Logo"
						labelClass="primary-btn upload-btn radius focus-shadow"
						accept="image/*"
						unwrappedField
						labelAfter
					/>
				</div>
			</div>

			<div className="row note">
				<div className="col-1">
					<small>
						Note: recommended image width to height ratio is 225:100
					</small>
				</div>
			</div>
		</Fragment>
	);
};

export default LogoField;
