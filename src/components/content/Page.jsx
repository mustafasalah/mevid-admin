import React, { Component, Fragment } from "react";
import SectionHeader from "./../common/SectionHeader";
import QuillEditor from "../../js/QuillEditor";
import FormSideSection from "./../common/form/FormSideSection";
import PublishFields from "./PublishFields";

class Page extends Component {
	componentDidMount() {
		// Run QuillEditor
		QuillEditor();
	}

	render() {
		return (
			<Fragment>
				<SectionHeader name="New Page" faClass="fas fa-plus fa-sm" />
				<form method="POST">
					<div id="main-side">
						<section className="widget form" id="new-page">
							<input
								className="radius"
								type="text"
								placeholder="Page Title Here..."
								id="page-title-input"
							/>
							<div id="page-editor">
								<div id="page-html-editor"></div>
							</div>
						</section>
					</div>

					<div id="end-side">
						<FormSideSection label="Publish" id="publish">
							<PublishFields />
						</FormSideSection>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default Page;
