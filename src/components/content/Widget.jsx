import React from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import { connect } from "react-redux";

const Widget = ({ data, dispatch }) => {
	const { title, type, enabled } = data;

	return (
		<div className="col-1">
			<div className="field">
				<div
					className={`widget-box radius blur-shadow${
						enabled === "0" ? " disabled" : ""
					}`}
				>
					<h4 className={type}>{title}</h4>
					<button
						className="settings-btn dark-btn focus-shadow radius-3"
						type="button"
						onClick={() => {
							// scroll to top
							window.scrollTo(0, 0);
							dispatch({
								type: ACTIONS.LOAD_LAYOUT_WIDGET_FORM,
								widget: data,
								formType: "layout",
							});
						}}
					>
						<i className="fas fa-sliders-h"></i> Settings
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect()(Widget);
