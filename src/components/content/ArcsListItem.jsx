import React from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ArcsListItem = ({ arcKey, arc, dispatch }) => {
	const { id, key, no, name } = arc;

	return (
		<li>
			<div className="arc-info">
				<span>Arc {no.toString().padStart(2, "0")}: </span>
				<strong>{name}</strong>
			</div>
			<ul className="arc-actions">
				<li>
					<Link
						to={`arc-{arcNo}/edit`}
						className="edit"
						onClick={() => {
							dispatch({
								type: ACTIONS.EDIT_ARC,
								arc_data: {
									id,
									key,
									no,
									name,
								},
							});
						}}
					>
						{" "}
						edit
					</Link>

					<Link
						to={`arc-{arcNo}/delete`}
						className="delete"
						onClick={() => {
							dispatch({
								type: ACTIONS.DELETE_ARC,
								arc_id: id,
								key,
							});
						}}
					>
						{" "}
						delete
					</Link>
				</li>
			</ul>
		</li>
	);
};

export default connect()(ArcsListItem);
