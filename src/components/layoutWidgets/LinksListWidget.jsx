import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const LinksListWidget = ({ onSubmit }) => (
	<FormSideSection label="Links List" id="links-list" submitBtn={onSubmit}>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Important Links"
				/>
			</div>
			<div className="col-1">
				<div className="field">
					<label htmlFor="link-name">Update Links List</label>
					<div className="row radius" id="nested-form">
						<div className="col-1">
							<div className="field">
								<label htmlFor="link-name">Link Name</label>
								<input
									id="link-name"
									name="link-name"
									type="text"
									placeholder="e.g. Terms of Use"
								/>
							</div>
						</div>
						<div className="col-1">
							<div className="field">
								<label htmlFor="link-url">Link Url</label>
								<input
									id="link-url"
									name="link-url"
									type="url"
									placeholder="e.g. http://www.mevid.com/terms-of-use"
								/>
							</div>
						</div>
						<button
							type="button"
							id="links-list-button"
							className="dark-btn radius-3 focus-shadow"
							disabled
						>
							Add Link
						</button>
					</div>
				</div>
			</div>

			<div className="col-1">
				<div className="field">
					<label>Current Links List</label>
					<ul id="current-links-list" className="blur-shadow radius">
						<li>
							<span
								className="link-name"
								data-url="http://www.mevid.com/about-us"
							>
								About Us
							</span>
							<div className="btns-wrapper">
								<button
									type="button"
									className="move-btn down-btn"
									title="move down"
								></button>
								<button
									type="button"
									className="move-btn up-btn"
									title="move up"
								></button>
								<button
									type="button"
									className="edit-btn"
									title="edit link"
								></button>
								<button
									type="button"
									className="delete-btn"
									title="delete link"
								></button>
							</div>
						</li>
						<li>
							<span
								className="link-name"
								data-url="http://www.mevid.com/terms-of-use"
							>
								Terms of Use
							</span>
							<div className="btns-wrapper">
								<button
									type="button"
									className="move-btn down-btn"
									title="move down"
								></button>
								<button
									type="button"
									className="move-btn up-btn"
									title="move up"
								></button>
								<button
									type="button"
									className="edit-btn"
									title="edit link"
								></button>
								<button
									type="button"
									className="delete-btn"
									title="delete link"
								></button>
							</div>
						</li>
						<li>
							<span
								className="link-name"
								data-url="http://www.mevid.com/join-us"
							>
								Join Us
							</span>
							<div className="btns-wrapper">
								<button
									type="button"
									className="move-btn down-btn"
									title="move down"
								></button>
								<button
									type="button"
									className="move-btn up-btn"
									title="move up"
								></button>
								<button
									type="button"
									className="edit-btn"
									title="edit link"
								></button>
								<button
									type="button"
									className="delete-btn"
									title="delete link"
								></button>
							</div>
						</li>

						<li>
							<span
								className="link-name"
								data-url="http://www.mevid.com/privacy-police"
							>
								Privacy Police
							</span>
							<div className="btns-wrapper">
								<button
									type="button"
									className="move-btn down-btn"
									title="move down"
								></button>
								<button
									type="button"
									className="move-btn up-btn"
									title="move up"
								></button>
								<button
									type="button"
									className="edit-btn"
									title="edit link"
								></button>
								<button
									type="button"
									className="delete-btn"
									title="delete link"
								></button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</FormSideSection>
);

export default LinksListWidget;
