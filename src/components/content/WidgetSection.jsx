import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";
import text from "../../langs/lang";
import WidgetHeader from "./WidgetHeader";

const WidgetSection = ({
    title,
    dropzone,
    addWidget,
    children,
    dispatch,
    removeActive,
}) => {
    return (
        <Fragment>
            <div className="col-1">
                <WidgetHeader title={title} />
            </div>
            {dropzone ? (
                <div className="col-1">
                    <div className="row drop-zone" id={dropzone}>
                        {children}
                    </div>
                </div>
            ) : (
                children
            )}

            {addWidget ? (
                <div className="col-1">
                    <div className="field">
                        <div className="add-widget radius">
                            <h4>
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch({
                                            type: ACTIONS.ADD_LAYOUT_WIDGET_FORM,
                                            widget: {
                                                type: "add",
                                                widgetType: "ads",
                                                position: addWidget,
                                            },
                                            formType: "layout",
                                        });

                                        // scroll up
                                        window.scrollTo(0, 0);

                                        // remove active status from other widget box
                                        typeof removeActive === "function" &&
                                            removeActive();
                                    }}
                                >
                                    {text("add_widget")}
                                </button>
                            </h4>
                        </div>
                    </div>
                </div>
            ) : undefined}
        </Fragment>
    );
};

export default connect()(WidgetSection);
