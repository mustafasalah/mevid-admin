import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractShows from "../common/AbstractShows";
import SectionHeader from "../common/SectionHeader";

class Shows extends AbstractShows {
	sectionHeader = (
		<SectionHeader
			name="Shows"
			link={{ href: "/shows/add", label: "New Show" }}
		/>
	);
}

const mapStateToProps = (state) => ({
	...state.tables.shows,
	items: state.shows,
});

const mapDispatchToProps = {
	...getTableActions("shows"),
	...getDataActions("shows"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
