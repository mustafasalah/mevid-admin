import React, { Fragment } from "react";

const WidgetSection = ({ title, dropzone, haveAddWidget, children }) => {
	return (
		<Fragment>
			<div className="col-1">
				<div className="field">
					<div className="widget-section">
						<h3>
							<span className="radius-3 focus-shadow">
								{title}
							</span>
						</h3>
					</div>
				</div>
			</div>
			{dropzone ? (
				<div className="col-1">
					<div className="row drop-zone" id={dropzone}>
						{children}
					</div>
				</div>
			) : (
				children
			)}

			{haveAddWidget ? (
				<div className="col-1">
					<div className="field">
						<div className="add-widget radius">
							<h4>
								<button type="button">Add Widget</button>
							</h4>
						</div>
					</div>
				</div>
			) : undefined}
		</Fragment>
	);
};

export default WidgetSection;
