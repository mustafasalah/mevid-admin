import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const SearchWidget = ({ onSubmit }) => (
	<FormSideSection
		label="Advance Search"
		id="advance-search"
		submitBtn={onSubmit}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Advance Search"
				/>
			</div>
			<div className="col-1">
				<FormField
					name="layout.enabled"
					label="Enabled"
					type="radio"
					htmlAfterField={
						<small>
							Enable or Disable Advance Search in the Home Page
						</small>
					}
				/>
			</div>
		</div>
	</FormSideSection>
);

export default SearchWidget;
