import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { connect } from "react-redux";
import text from "../../langs/lang";

const CategoryWidget = ({ siteContent, onSubmit, onDelete }) => (
    <FormSideSection
        label={text("category_of_shows")}
        id="category"
        submitBtn={onSubmit}
        deleteBtn={onDelete}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={text("default_category_of_shows")}
                />
            </div>

            <div className="col-1">
                <FormField
                    name="layout.settings.category"
                    label={text("category")}
                    type="select"
                    placeholder={text("default_all_categories")}
                    options={siteContent.map((content) => {
                        if (content === "movies") {
                            return {
                                label: text("movie"),
                                value: "movie",
                            };
                        } else if (content === "tvshows") {
                            return {
                                label: text("tv_show"),
                                value: "tvshow",
                            };
                        } else {
                            return {
                                label: text("anime"),
                                value: "anime",
                            };
                        }
                    })}
                    multiple
                />
            </div>

            <div className="col-1">
                <TagsField
                    name="layout.settings.tag"
                    label={text("tag")}
                    type="select"
                    placeholder={text("default_no_tag")}
                    htmlAfterField={
                        <small>
                            {text(
                                "used_to_group_collection_of_shows_together_under_certain_name"
                            )}
                        </small>
                    }
                />
            </div>

            <div className="col-1">
                <FormField
                    name="layout.settings.shows_no"
                    label={text("shows_no")}
                    type="number"
                    placeholder={`${text("default")}: 6`}
                    min="3"
                    step="3"
                />
            </div>
        </div>
    </FormSideSection>
);

export default connect((state) => ({
    siteContent: state.forms.settings.data.site_content,
}))(CategoryWidget);
