import React from "react";
import { Fragment } from "react";
import FormField from "./../common/form/FormField";
import getAuthors from "./../services/fakeAuthorsServices";

const PublishFields = ({ form }) => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-3-1">
					<FormField
						label="Status"
						name={`${form}.publish_status`}
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
						defaultValue="mustafa_salah"
						options={getAuthors().map((author) => ({
							label: author,
							value: author,
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
			</div>

			<button type="submit" className="primary-btn focus-shadow radius">
				Publish
			</button>
			<button type="submit" className="dark-btn focus-shadow radius">
				Save Draft
			</button>
		</Fragment>
	);
};

export default PublishFields;
