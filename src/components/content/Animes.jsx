import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractShows from "../common/AbstractShows";
import SectionHeader from "../common/SectionHeader";
import text from "../../langs/lang";

class Animes extends AbstractShows {
    sectionHeader = (
        <SectionHeader
            name={text("anime")}
            link={{ href: "/shows/anime/add", label: text("new_anime") }}
        />
    );

    constructor(props) {
        super(props);
        this.tableColumns[1].label = text("anime_name");
    }
}

const mapStateToProps = (state) => ({
    ...state.tables.animes,
    items: state.shows.filter((show) => show.category === "anime"),
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
    ...getTableActions("animes"),
    ...getDataActions("shows"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Animes);
