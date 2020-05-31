import React, { Fragment } from "react";
import ArcForm from "./ArcForm";
import ArcsList from "./ArcsList";

const Arcs = ({ arcs }) => {
	return (
		<Fragment>
			<ArcForm />
			{arcs.length !== 0 && <ArcsList arcs={arcs} />}
		</Fragment>
	);
};

Arcs.defaultProps = {
	arcs: [],
};

export default Arcs;
