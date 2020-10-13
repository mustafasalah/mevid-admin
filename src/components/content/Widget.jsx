import React from "react";

const Widget = ({ data: { title, type, enabled } }) => {
	return (
		<div className="col-1">
			<div className="field">
				<div
					className={`widget-box radius blur-shadow${
						enabled === "0" ? " disabled" : ""
					}`}
				>
					<h4 className={type}>{title}</h4>
					<button className="settings-btn dark-btn focus-shadow radius-3">
						<i className="fas fa-sliders-h"></i> Settings
					</button>
				</div>
			</div>
		</div>
	);
};

export default Widget;
