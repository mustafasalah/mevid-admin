import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const AdsWidget = ({ onSubmit, onDelete }) => (
	<FormSideSection
		label="ADS"
		id="ads"
		submitBtn={onSubmit}
		deleteBtn={onDelete}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.settings.content"
					label="HTML Code"
					type="textarea"
					placeholder="HTML Code Here..."
				/>
			</div>
		</div>
	</FormSideSection>
);

export default AdsWidget;
