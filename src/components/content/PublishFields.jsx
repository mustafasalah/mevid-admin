import React from "react";
import { Fragment } from "react";
import FormField from "./../common/form/FormField";
import getAuthors from "./../services/fakeAuthorsServices";

const PublishFields = ({ form, submitLabel = "Publish", extraFields }) => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-3-1">
					<FormField
						label="Status"
						name={`${form}.published`}
						type="select"
						defaultValue="publish"
						options={[
							{ label: "Draft", value: "0" },
							{ label: "Publish", value: "1" },
						]}
					/>
				</div>

				<div className="col-3-2">
					<FormField
						label="Author"
						name={`${form}.author`}
						type="select"
						options={getAuthors().map((author) => ({
							label: author.name,
							value: +author.id,
						}))}
					/>
				</div>

				<div className="col-1">
					<FormField
						label="Keywords"
						name={`${form}.keywords`}
						type="text"
						htmlAfterField={
							<small>
								Used to find the show in the search engine
							</small>
						}
					/>
				</div>

				<div className="col-1">
					<FormField
						label="Description"
						name={`${form}.description`}
						type="textarea"
						htmlAfterField={
							<small>
								Shown in search engine results below show title
							</small>
						}
					/>
				</div>

				<div className="col-3-2">
					<FormField
						label="Publish Date"
						name={`${form}.publish_date.date`}
						className="date"
						type="text"
						autoComplete="off"
						dateType="date-from"
					/>
				</div>

				<div className="col-3-1">
					<FormField
						label="Publish Time"
						name={`${form}.publish_date.time`}
						className="time"
						type="text"
					/>
				</div>

				{extraFields &&
					extraFields.map((field, i) => (
						<div key={i} className="col-1">
							{field}
						</div>
					))}
			</div>

			<button type="submit" className="primary-btn focus-shadow radius">
				{submitLabel}
			</button>
		</Fragment>
	);
};

export default PublishFields;
