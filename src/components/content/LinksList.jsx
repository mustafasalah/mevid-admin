import React from "react";

const LinksList = ({
	title = "Current Links List",
	links,
	onMove,
	onEdit,
	onDelete,
	startingIndex = 0,
}) => {
	return (
		<div className="field">
			<label>{title}</label>
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
									onClick={() =>
										onMove(
											i + startingIndex,
											link.nested_in,
											"down"
										)
									}
								></button>
								<button
									type="button"
									className="move-btn up-btn"
									title="move up"
									onClick={() =>
										onMove(
											i + startingIndex,
											link.nested_in,
											"up"
										)
									}
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
										deleteIt &&
											onDelete(link.id, link.nested_in);
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
