import React, { Fragment } from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import ArcForm from "./ArcForm";
import ArcsList from "./ArcsList";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import text from "../../langs/lang";

const Arcs = ({ arcs, dispatch }) => {
    return (
        <Fragment>
            <ArcForm
                data={arcs.form}
                onSubmit={(e) => {
                    e.preventDefault();

                    // handle arc no duplication error
                    if (arcs.list.some(({ no }) => no == arcs.form.no)) {
                        toast.error(text("arc_no_should_not_be_duplicated"));
                        return;
                    }

                    dispatch({
                        type: ACTIONS.UPDATE_ARC,
                        data: arcs.form,
                    });
                }}
            />
            {arcs.list.length !== 0 && <ArcsList arcs={arcs.list} />}
        </Fragment>
    );
};

Arcs.defaultProps = {
    arcs: [],
};

export default connect((state) => ({ arcs: state.forms.show.data.arcs }))(Arcs);
