import React from "react";
import { Link } from "react-router-dom";

const SectionHeader = (props) => {
	const { name, link, faClass = "fas fa-film" } = props;

	return (
		<h2>
			<span>
				<i className={faClass}></i> {name}
			</span>
			{link && (
				<Link to={link.href} className="add-new radius-3">
					{link.label}
				</Link>
			)}
		</h2>
	);
};

export default SectionHeader;
