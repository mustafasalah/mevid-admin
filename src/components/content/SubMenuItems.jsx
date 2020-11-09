import React from "react";
import SubMenuForm from "./SubMenuForm";
import LinksList from "./LinksList";

const SubMenuItems = ({ links }) => {
	console.log(links);
	return (
		<div className="row">
			<div className="col-1">
				<SubMenuForm />
			</div>
			<div className="col-1">
				<LinksList links={links} title="Current SubMenu Items" />
			</div>
		</div>
	);
};

export default SubMenuItems;
