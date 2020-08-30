import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QuillEditor from "../../js/QuillEditor";
import $ from "jquery";
import SectionHeader from "./../common/SectionHeader";
import FormSideSection from "./../common/form/FormSideSection";
import PublishFields from "./PublishFields";
import PageFormActions from "../../actions/PageFormActions";

const Page = ({
	data,
	onFormSubmit: onSubmit,
	onFieldChange: onChange,
	onFormReset: onReset,
	onPageDataLoad,
}) => {
	const history = useHistory();
	const params = useParams();
	const pageId = params.id && Number(params.id);

	// useEffect(() => {
	// 	(async () => {
	// 		if (pageId === undefined) return onReset();
	// 		try {
	// 			const episodeData = await getPageData(pageId);
	// 			onPageDataLoad(episodeData);
	// 		} catch (ex) {
	// 			toast.error("There is no page with this id: " + pageId, {
	// 				autoClose: 2500,
	// 				onClose: () => history.goBack(),
	// 			});
	// 		}
	// 	})();
	// }, []);

	useEffect(() => {
		// initialize Qill Editor
		const quill = QuillEditor();
		quill.on("text-change", (delta, oldContent) => {
			const content = $(quill.container).children(".ql-editor").html();
			onChange("content", content);
		});
	}, []);

	return (
		<Fragment>
			<SectionHeader
				name={`${pageId ? "Edit" : "New"} Page`}
				faClass={`fas ${pageId ? "fa-edit" : "fa-plus fa-sm"}`}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(data, () => {
						history.push("/pages/");
					});
				}}
			>
				<div id="main-side">
					<section className="widget form" id="new-page">
						<input
							className="radius"
							value={data.title}
							type="text"
							placeholder="Page Title Here..."
							id="page-title-input"
							onChange={({ currentTarget: input }) =>
								onChange("title", input.value)
							}
						/>
						<div id="page-editor">
							<div id="page-html-editor"></div>
						</div>
					</section>
				</div>

				<div id="end-side">
					<FormSideSection label="Publish" id="publish">
						<PublishFields
							form="page"
							submitLabel={data.id ? "Save Changes" : "Create"}
						/>
					</FormSideSection>
				</div>
			</form>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		...state.forms.page,
	}),
	PageFormActions
)(Page);
