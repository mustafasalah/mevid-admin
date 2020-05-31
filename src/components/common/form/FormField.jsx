import React, { Fragment } from "react";
import { connect } from "react-redux";
import Select from "./Select";
import showFormActions from "./../../../actions/ShowFormActions";
import Input from "./Input";
import { getNestedProperty } from "./../../../js/Utility";

const FormField = ({
	className,
	labelClass,
	label,
	type,
	name,
	required,
	htmlAfterField,
	unwrappedField,
	dateType,
	onFieldChanged,
	forms,
	...props
}) => {
	const fieldName = label.replace(" ", "-").toLowerCase() + "-field-" + name;
	const isControlled = name !== "" ? true : undefined;

	let formName, formField;

	if (isControlled) {
		const index = name.indexOf(".");
		formName = name.slice(0, index);
		formField = name.slice(index + 1);
	}

	const renderField = () => {
		switch (type) {
			case "select":
				return (
					<Select
						id={fieldName}
						onChange={
							isControlled &&
							((select) => {
								if (props.multiple) {
									const selectedOptions = Array.from(
										select.selectedOptions
									);
									onFieldChanged(
										formField,
										selectedOptions.map((opt) => opt.value)
									);
								} else {
									onFieldChanged(formField, select.value);
								}
							})
						}
						name={fieldName}
						value={
							isControlled &&
							getNestedProperty(
								forms[formName]["data"],
								formField
							)
						}
						data-error={
							isControlled &&
							!!forms[formName]["errors"][formField]
						}
						{...props}
					/>
				);

			case "textarea":
				return (
					<textarea
						id={fieldName}
						onChange={
							isControlled &&
							(({ currentTarget: input }) =>
								onFieldChanged(formField, input.value))
						}
						name={fieldName}
						value={
							isControlled &&
							getNestedProperty(
								forms[formName]["data"],
								formField
							)
						}
						data-error={
							isControlled &&
							!!forms[formName]["errors"][formField]
						}
						{...props}
					/>
				);

			default:
				return (
					<Input
						id={fieldName}
						name={fieldName}
						value={
							isControlled &&
							getNestedProperty(
								forms[formName]["data"],
								formField
							)
						}
						data-error={
							isControlled &&
							!!forms[formName]["errors"][formField]
						}
						type={type}
						className={className}
						required={required}
						datetype={className === "date" ? dateType : ""}
						onChange={
							isControlled &&
							(({ currentTarget: input }) =>
								onFieldChanged(formField, input.value))
						}
						{...props}
					/>
				);
		}
	};

	const renderContent = () => (
		<Fragment>
			{label !== "" && (
				<label
					htmlFor={fieldName}
					className={(required ? "required " : "") + labelClass}
				>
					{label}
				</label>
			)}
			{renderField()}
			{htmlAfterField}
		</Fragment>
	);

	return unwrappedField ? (
		renderContent()
	) : (
		<div className={`field ${className}`}>{renderContent()}</div>
	);
};

FormField.defaultProps = {
	type: "text",
	label: "",
	className: "",
	labelClass: "",
	required: false,
	dateType: "",
	options: [],
	htmlAfterField: "",
	unwrappedField: false,
	name: "",
};

export default connect(
	(state) => ({
		forms: state.forms,
	}),
	showFormActions
)(FormField);
