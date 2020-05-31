import React from "react";

const FormSideSection = ({ required, label, children, ...props }) => {
	return (
		<section className="widget form radius" {...props}>
			<h3>
				<span className={required ? "required" : ""}>{label}</span>
			</h3>

			<div className="widget-content">{children}</div>
		</section>
	);
};

FormSideSection.defaultProps = {
	id: "",
	required: false,
};

export default FormSideSection;
