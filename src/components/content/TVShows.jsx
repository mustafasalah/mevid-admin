import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractShows from "../common/AbstractShows";
import SectionHeader from "../common/SectionHeader";
import text from "../../langs/lang";

class TVShows extends AbstractShows {
    sectionHeader = (
        <SectionHeader
            name={text("tv_shows")}
            link={{ href: "/shows/tv-shows/add", label: text("new_tv_show") }}
        />
    );
}

const mapStateToProps = (state) => ({
    ...state.tables.tvshows,
    items: state.shows.filter((show) => show.category === "tvshow"),
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
    ...getTableActions("tvshows"),
    ...getDataActions("shows"),
};

export default connect(mapStateToProps, mapDispatchToProps)(TVShows);
