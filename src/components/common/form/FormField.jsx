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
	onFormSubmit,
	forms,
	labelAfter,
	...props
}) => {
	const fieldName = label.replace(" ", "-").toLowerCase() + "-field-" + name;
	const isControlled = name !== "" && type !== "file" ? true : undefined;

	let formName, formField;

	if (name !== "") {
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
						datetype={className === "date" ? dateType : ""}
						onChange={
							(isControlled || type === "file"
								? true
								: undefined) &&
							(({ currentTarget: input }) => {
								if (type !== "file") {
									onFieldChanged(formField, input.value);
								} else {
									onFieldChanged(
										formField,
										props.multiple
											? input.files
											: input.files[0]
									);
								}
							})
						}
						{...props}
					/>
				);
		}
	};

	const renderLabel = () => (
		<label
			htmlFor={fieldName}
			className={(required ? "required " : "") + labelClass}
		>
			{label}
		</label>
	);

	const renderContent = () => (
		<Fragment>
			{label !== "" && !labelAfter && renderLabel()}
			{renderField()}
			{label !== "" && labelAfter && renderLabel()}
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
	labelAfter: false,
};

export default connect(
	(state) => ({
		forms: state.forms,
	}),
	showFormActions
)(FormField);
