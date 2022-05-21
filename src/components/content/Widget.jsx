import React from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import { connect } from "react-redux";
import text from "../../langs/lang";

const defaultTitle = new Map([
    ["slider", text("shows_slider")],
    ["recent", text("recent_added")],
    ["ads", text("ads")],
    ["category", text("category_of_shows")],
    ["social_media", text("follow_us")],
    ["search", text("advance_search")],
    ["schedule", text("today_schedule")],
    ["selected_shows", text("picked_shows")],
    ["about", text("about_us")],
    ["links_list", text("important_links")],
    ["account", text("account")],
]);

const Widget = ({ data, dispatch, position, isActive, onClick }) => {
    let { title, type, enabled } = data;

    if (
        (title === "Header Ads" || title === "Shows Slider") &&
        position === "header"
    ) {
        title = text(title);
    }

    return (
        <div className="col-1">
            <div className="field">
                <div
                    className={`widget-box radius blur-shadow${
                        enabled === "0" ? " disabled" : ""
                    }${isActive ? " active" : ""}`}
                >
                    <h4 className={type}>{title || defaultTitle.get(type)}</h4>
                    <button
                        className="settings-btn dark-btn focus-shadow radius-3"
                        type="button"
                        onMouseDown={() => {
                            // scroll to top
                            window.scrollTo(0, 0);

                            dispatch({
                                type: ACTIONS.LOAD_LAYOUT_WIDGET_FORM,
                                widget: data,
                                formType: "layout",
                                position,
                            });

                            // handler to make this widget active
                            typeof onClick === "function" && onClick();
                        }}
                    >
                        <i className="fas fa-sliders-h"></i> {text("settings")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect()(Widget);
