import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractShows from "../common/AbstractShows";
import SectionHeader from "../common/SectionHeader";
import text from "../../langs/lang";

const getContentList = (content) => {
    return content.map((item) => {
        let label = "",
            href = `/shows/${item}/add`;

        switch (item) {
            case "movies":
                label = text("movie");
                break;

            case "anime":
                label = text("anime");
                break;

            case "tvshows":
                label = text("tv_show");
                href = `/shows/tv-shows/add`;
                break;
        }

        return { label, href };
    });
};

class Shows extends AbstractShows {
    sectionHeader = (
        <SectionHeader
            name={text("shows")}
            link={{
                label: text("new_show"),
                content: getContentList(this.props.siteContent),
            }}
        />
    );
}

const mapStateToProps = (state) => ({
    ...state.tables.shows,
    siteContent: state.forms.settings.data.site_content,
    items: state.shows,
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
    ...getTableActions("shows"),
    ...getDataActions("shows"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
