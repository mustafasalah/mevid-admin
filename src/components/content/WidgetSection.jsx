import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";

const WidgetSection = ({ title, dropzone, addWidget, children, dispatch }) => {
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

			{addWidget ? (
				<div className="col-1">
					<div className="field">
						<div className="add-widget radius">
							<h4>
								<button
									type="button"
									onClick={() => {
										dispatch({
											type:
												ACTIONS.ADD_LAYOUT_WIDGET_FORM,
											widget: {
												type: "add",
												widgetType: "ads",
												position: addWidget,
											},
											formType: "layout",
										});
									}}
								>
									Add Widget
								</button>
							</h4>
						</div>
					</div>
				</div>
			) : undefined}
		</Fragment>
	);
};

export default connect()(WidgetSection);
