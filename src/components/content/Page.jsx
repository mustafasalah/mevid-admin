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
import getPages from "../services/pagesServices";
import getDataActions from "./../../actions/DataActions";
import text from "../../langs/lang";

const Page = ({
    data,
    onFormSubmit: onSubmit,
    onFieldChange: onChange,
    onFormReset: onReset,
    onPageDataLoad,
    deletePageHandler,
}) => {
    const history = useHistory();
    const params = useParams();
    const pageId = params.id && Number(params.id);
    let editor;

    useEffect(() => {
        // initialize Qill Editor
        const quill = QuillEditor();
        editor = $(quill.container).children(".ql-editor");
        quill.on("text-change", () => {
            const content = editor.html();
            onChange("content", content);
        });
    }, []);

    useEffect(() => {
        (async () => {
            if (pageId === undefined) {
                onReset();
                editor.html("");
                return;
            }

            try {
                const pageData = await getPages(pageId);
                onPageDataLoad(pageData, ({ content }) => {
                    editor.html(content);
                });
            } catch (ex) {
                toast.error(`${text("there_is_no_page_with_this_id")} pageId`, {
                    autoClose: 2500,
                    onClose: () => history.goBack(),
                });
            }
        })();
    }, []);

    return (
        <Fragment>
            <SectionHeader
                name={pageId ? text("edit_page") : text("new_page")}
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
                            placeholder={text("page_title_here")}
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
                    <FormSideSection label={text("publish")} id="publish">
                        <PublishFields
                            form="page"
                            submitLabel={
                                data.id ? text("save_changes") : text("create")
                            }
                            deleteBtn={
                                data.id
                                    ? {
                                          label: text("delete"),
                                          handler: () => {
                                              const deleteIt = window.confirm(
                                                  text(
                                                      "are_you_sure_to_delete_this_page"
                                                  )
                                              );
                                              deleteIt &&
                                                  deletePageHandler(data.id);
                                              history.replace("/pages");
                                          },
                                      }
                                    : undefined
                            }
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
    {
        ...PageFormActions,
        deletePageHandler: getDataActions("pages").deleteData,
    }
)(Page);
