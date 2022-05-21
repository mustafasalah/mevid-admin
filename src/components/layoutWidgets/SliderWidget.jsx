import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { getGenresOptions } from "./../services/getGenres";
import { connect } from "react-redux";
import text from "../../langs/lang";

const SliderWidget = ({ siteContent, onSubmit }) => (
    <FormSideSection
        label={text("shows_slider")}
        id="shows-slider"
        submitBtn={onSubmit}
    >
        <div className="row">
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
                <FormField
                    name="layout.settings.genres"
                    label={text("genres")}
                    type="select"
                    options={getGenresOptions}
                    placeholder={text("default_all")}
                    multiple
                />
            </div>

            <div className="col-1">
                <TagsField
                    name="layout.settings.tag"
                    label={text("tags")}
                    type="select"
                    placeholder={text("press_enter_after_any_tag_you_write")}
                    multiple
                    tags
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
                    name="layout.settings.order"
                    label={text("order_by")}
                    type="select"
                    options={[
                        {
                            label: text("latest"),
                            value: "latest",
                        },
                        {
                            label: text("oldest"),
                            value: "oldest",
                        },
                        {
                            label: text("most_viewed"),
                            value: "views",
                        },
                        {
                            label: text("top_rated"),
                            value: "rates",
                        },
                    ]}
                />
            </div>

            <div className="col-1">
                <FormField
                    name="layout.settings.shows_no"
                    label={text("shows_no")}
                    type="number"
                    min="4"
                    placeholder={`${text("default")}: 8`}
                />
            </div>

            <div className="col-1">
                <FormField
                    name="layout.enabled"
                    label={text("enabled")}
                    type="radio"
                    htmlAfterField={
                        <small>
                            {text(
                                "enable_or_disable_show_slider_from_home_page"
                            )}
                        </small>
                    }
                />
            </div>
        </div>
    </FormSideSection>
);

export default connect((state) => ({
    siteContent: state.forms.settings.data.site_content,
}))(SliderWidget);
