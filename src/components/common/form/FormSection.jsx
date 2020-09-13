import React, { useState, useRef } from "react";
import $ from "jquery";

const FormSection = ({ header, faClass, children, ...props }) => {
	const [opened, setOpened] = useState(true);
	const widgetContent = useRef(null);

	return (
		<section className="widget form" {...props}>
			<h3
				className={`radius ${opened ? "blur-shadow" : "closed"}`}
				onClick={() => {
					setOpened(!opened);
					$(widgetContent.current).slideToggle(400);
				}}
			>
				<span>
					<i className={faClass}></i>
					{" " + header}
				</span>
			</h3>
			<div className="widget-content radius" ref={widgetContent}>
				{children}
			</div>
		</section>
	);
};

FormSection.defaultProps = {
	faClass: "fas fa-info-circle",
};

export default FormSection;
