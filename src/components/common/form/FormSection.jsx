import React from "react";

const FormSection = ({ header, faClass, children, ...props }) => {
	return (
		<section className="widget form" {...props}>
			<h3 className="radius blur-shadow">
				<span>
					<i className={faClass}></i>
					{" " + header}
				</span>
			</h3>
			<div className="widget-content radius">{children}</div>
		</section>
	);
};

FormSection.defaultProps = {
	faClass: "fas fa-info-circle",
};

export default FormSection;
