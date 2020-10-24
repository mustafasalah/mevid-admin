import React, { useState, useRef } from "react";
import $ from "jquery";

const FormSideSection = ({
	required,
	label,
	children,
	submitBtn = false,
	deleteBtn = false,
	opened: open = true,
	...props
}) => {
	const [opened, setOpened] = useState(open);
	const widgetContent = useRef(null);

	return (
		<section className="widget form radius" {...props}>
			<h3
				className={opened ? "" : "closed blur-shadow"}
				onClick={() => {
					setOpened(!opened);
					$(widgetContent.current).slideToggle(400);
				}}
			>
				<span className={required ? "required" : ""}>{label}</span>
			</h3>

			<div className="widget-content" ref={widgetContent}>
				{children}

				{submitBtn && (
					<button
						className="primary-btn focus-shadow radius"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							if (typeof submitBtn === "function") {
								submitBtn();
							} else {
								submitBtn.handler();
							}
						}}
					>
						{submitBtn.label || "Save Changes"}
					</button>
				)}

				{deleteBtn && (
					<button
						className="dark-btn focus-shadow radius"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							if (typeof deleteBtn === "function") {
								deleteBtn();
							} else {
								deleteBtn.handler();
							}
						}}
					>
						{deleteBtn.label || "Delete"}
					</button>
				)}
			</div>
		</section>
	);
};

FormSideSection.defaultProps = {
	id: "",
	required: false,
};

export default FormSideSection;
