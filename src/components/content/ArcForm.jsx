import React from "react";
import FormField from "../common/form/FormField";

const ArcForm = () => {
	return (
		<div className="row radius">
			<div className="col-5-1">
				<FormField
					label="Arc No."
					type="number"
					min="1"
					placeholder="e.g. 01"
					required
				/>
			</div>
			<div className="col-5-4">
				<div className="row">
					<div className="col-5-4">
						<FormField
							label="Arc Name"
							type="text"
							placeholder="e.g. Greed Island"
						/>
					</div>
					<div className="col-5-1 center-col">
						<button
							type="button"
							className="dark-btn radius-3 more-btn focus-shadow"
						>
							{" "}
							Add Arc
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArcForm;
