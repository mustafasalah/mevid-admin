import React from "react";
import FormField from "./FormField";
import { genresUrlOptions } from "../../services/getGenres";
import TagsField from "../../content/TagsField";
import text from "../../../langs/lang";

const LinkField = ({ pages, siteContent, form }) => {
    switch (form.type) {
        case "link":
            return (
                <FormField
                    name="mainmenu.link"
                    label={text("url")}
                    type="url"
                    placeholder={`${text("e.g.")} /scheduler`}
                />
            );

        case "page":
            return (
                <FormField
                    name="mainmenu.link"
                    label={text("page")}
                    type="select"
                    options={pages.map((page) => ({
                        label: page.title,
                        value: `/pages/${page.id}/${page.title.replace(
                            /\s+/g,
                            "-"
                        )}`,
                    }))}
                    placeholder={text("select_page")}
                />
            );

        case "category":
            return (
                <FormField
                    name="mainmenu.link"
                    label={text("category")}
                    type="select"
                    options={siteContent.map((content) => {
                        let label;
                        if (content === "movies") {
                            label = text("movies");
                        } else if (content === "tvshows") {
                            label = text("tv_shows");
                        } else {
                            label = text("the_anime");
                        }
                        return {
                            label,
                            value: `/${content}`,
                        };
                    })}
                    placeholder={text("select_category")}
                />
            );

        case "genre":
            return (
                <FormField
                    name="mainmenu.link"
                    label={text("the_genre")}
                    type="select"
                    options={genresUrlOptions}
                    placeholder={text("select_genre")}
                />
            );

        case "tag":
            return (
                <TagsField
                    name="mainmenu.link"
                    label={text("tag")}
                    type="select"
                    tagValuePrefix="/tag/"
                    urlEncodeValue
                    placeholder={text("select_tag")}
                />
            );

        default:
            return;
    }
};

export default LinkField;
