import React from "react";
import ArcsListItem from "./ArcsListItem";

const ArcsList = ({ arcs }) => {
	return (
		<div className="row radius">
			<div className="col-1">
				<ol id="arcs-list">
					{arcs.map((arc) => (
						<ArcsListItem arc={arc} />
					))}
				</ol>
			</div>
		</div>
	);
};

export default ArcsList;
