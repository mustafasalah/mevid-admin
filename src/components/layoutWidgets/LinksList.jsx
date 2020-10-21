import React from "react";

const LinksList = ({ links, onMove, onEdit, onDelete }) => {
	return (
		<div className="field">
			<label>Current Links List</label>
			{links.length === 0 ? (
				<p className="not-available radius">No links yet</p>
			) : (
				<ul id="current-links-list" className="blur-shadow radius">
					{links.map((link, i) => (
						<li key={link.label + i}>
							<span className="link-name">{link.label}</span>
							<div className="btns-wrapper">
								<button
									type="button"
									className="move-btn down-btn"
									title="move down"
									onClick={() => onMove(i, "down")}
								></button>
								<button
									type="button"
									className="move-btn up-btn"
									title="move up"
									onClick={() => onMove(i, "up")}
								></button>
								<button
									type="button"
									className="edit-btn"
									title="edit link"
									onClick={() => onEdit(link, i)}
								></button>
								<button
									type="button"
									className="delete-btn"
									title="delete link"
									onClick={() => {
										const deleteIt = window.confirm(
											"Are you sure to delete this link?"
										);
										deleteIt && onDelete(i);
									}}
								></button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default LinksList;