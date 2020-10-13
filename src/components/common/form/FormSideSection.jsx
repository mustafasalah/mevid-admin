import React, { useState, useRef } from "react";
import $ from "jquery";

const FormSideSection = ({
	required,
	label,
	children,
	submitBtn = false,
	deleteBtn = false,
	...props
}) => {
	const [opened, setOpened] = useState(true);
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
			</div>

			{submitBtn && (
				<button
					className="primary-btn focus-shadow radius"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						submitBtn.handler();
					}}
				>
					Save Changes
				</button>
			)}

			{deleteBtn && (
				<button
					className="dark-btn focus-shadow radius"
					type="button"
					onClick={(e) => {
						e.preventDefault();
						deleteBtn.handler();
					}}
				>
					Delete
				</button>
			)}
		</section>
	);
};

FormSideSection.defaultProps = {
	id: "",
	required: false,
};

export default FormSideSection;
