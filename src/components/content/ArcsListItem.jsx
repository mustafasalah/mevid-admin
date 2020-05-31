import React from "react";
import { Link } from "react-router-dom";

const ArcsListItem = ({ arc: { id, title } }) => {
	return (
		<li>
			<div className="arc-info">
				<span>Arc 01: </span>
				<strong>Hunter Examination</strong>
			</div>
			<ul className="arc-actions">
				<li>
					<Link href={`arc-{arcNo}/edit`} className="edit">
						edit
					</Link>

					<Link href={`arc-{arcNo}/delete`} className="delete">
						delete
					</Link>
				</li>
			</ul>
		</li>
	);
};

export default ArcsListItem;
