import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { getGenresOptions } from "./../services/getGenres";
import IconsFormField from "./IconsFormField";
import text from "../../langs/lang";

const PickedShowsWidget = ({ onSubmit, onDelete }) => (
    <FormSideSection
        label={text("picked_shows")}
        id="selected-shows"
        submitBtn={onSubmit}
        deleteBtn={onDelete}
    >
        <div className="row">
            <div className="col-1">
                <FormField
                    name="layout.title"
                    label={text("title")}
                    type="text"
                    placeholder={`${text("default")}: ${text("picked_shows")}`}
                />
            </div>

            <div className="col-1">
                <IconsFormField />
            </div>

            <div className="col-1">
                <FormField
                    name="layout.settings.category"
                    label={text("category")}
                    type="select"
                    placeholder={text("default_all_categories")}
                    options={[
                        {
                            label: text("movie"),
                            value: "movie",
                        },
                        { label: "Anime", value: "anime" },
                        {
                            label: text("tv_show"),
                            value: "tvshow",
                        },
                    ]}
                    multiple
                />
            </div>

            <div className="col-1">
                <FormField
                    name="layout.settings.genres"
                    label={text("genres")}
                    type="select"
                    options={getGenresOptions}
                    placeholder={`${text("default")}: ${text("all_genres")}`}
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
                    min="2"
                    placeholder={`${text("default")}: 8`}
                />
            </div>
        </div>
    </FormSideSection>
);

export default PickedShowsWidget;
