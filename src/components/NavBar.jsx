import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { authorize, upperFirst } from "./../js/Utility";
import { connect } from "react-redux";
import text from "../langs/lang";

const renderShowsLinks = (siteContent) => {
    if (siteContent.length > 1) {
        const result = [];

        result[0] = (
            <li key="all">
                <NavLink exact to="/shows">
                    {text("all_shows")}
                </NavLink>
            </li>
        );

        for (let content of siteContent) {
            if (content === "tvshows") content = "tv-shows";
            result.push(
                <li key={content}>
                    <NavLink to={`/shows/${content}`}>
                        {content === "tv-shows"
                            ? text("tv_shows")
                            : upperFirst(text(content))}
                    </NavLink>
                </li>
            );
        }

        return result;
    } else {
        if (siteContent.length === 0) return;

        let content = siteContent[0];
        if (content === "tvshows") content = "tv-shows";

        return (
            <li>
                <NavLink to={`/shows/${content}`} className="radius">
                    <i className="fas fa-film"></i>{" "}
                    {content === "tv-shows" ? "TV Shows" : upperFirst(content)}
                </NavLink>
            </li>
        );
    }
};

const NavBar = ({
    loggedUser: { role },
    settings: { site_content: siteContent },
}) => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/dashboard" className="radius">
                        <i className="fas fa-chart-area"></i>{" "}
                        {text("dashboard")}
                    </NavLink>
                </li>

                {siteContent.length === 1 ? (
                    renderShowsLinks(siteContent)
                ) : (
                    <li>
                        <NavLink to="/shows" className="radius">
                            <i className="fas fa-film"></i> {text("shows")}
                        </NavLink>

                        <ul className="sub-menu blur-shadow radius">
                            {renderShowsLinks(siteContent)}
                        </ul>
                    </li>
                )}

                {(siteContent.includes("tvshows") ||
                    siteContent.includes("anime")) && (
                    <li>
                        <NavLink to="/episodes" className="radius">
                            <i className="fas fa-film"></i> {text("episodes")}
                        </NavLink>

                        <ul className="sub-menu blur-shadow radius">
                            <li>
                                <NavLink exact to="/episodes">
                                    {text("all_episodes")}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/episodes/add"
                                    className="add-link"
                                >
                                    {text("add_episode")}
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                )}

                <li>
                    <NavLink to="/comments" className="radius">
                        <i className="fas fa-comments"></i> {text("comments")}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reviews" className="radius">
                        <i className="fas fa-star-half-alt"></i>{" "}
                        {text("reviews")}
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/reports" className="radius">
                        <i className="fas fa-bug"></i> {text("reports")}
                    </NavLink>
                </li>

                {authorize(role, "supervisor") && (
                    <li>
                        <NavLink to="/scheduler" className="radius">
                            <i className="fas fa-calendar-alt"></i>{" "}
                            {text("scheduler")}
                        </NavLink>
                    </li>
                )}

                {authorize(role, "admin") && (
                    <Fragment>
                        <li>
                            <NavLink to="/users" className="radius">
                                <i className="fas fa-users"></i> {text("users")}
                            </NavLink>

                            <ul className="sub-menu blur-shadow radius">
                                <li>
                                    <NavLink exact to="/users">
                                        {text("all_users")}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/users/new"
                                        className="add-link"
                                    >
                                        {text("add_user")}
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NavLink to="/pages" className="radius">
                                <i className="fas fa-copy"></i> {text("pages")}
                            </NavLink>

                            <ul className="sub-menu blur-shadow radius">
                                <li>
                                    <NavLink exact to="/pages">
                                        {text("all_pages")}
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/pages/new"
                                        className="add-link"
                                    >
                                        {text("create_page")}
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NavLink to="/layout" className="radius">
                                <i className="fas fa-brush"></i>{" "}
                                {text("layout_and_view")}
                            </NavLink>

                            <ul className="sub-menu blur-shadow radius">
                                <li>
                                    <NavLink exact to="/layout">
                                        Site Layout
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/layout/main-menu">
                                        Menu Layout
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NavLink to="/settings" className="radius">
                                <i className="fas fa-cogs"></i>{" "}
                                {text("general_settings")}
                            </NavLink>
                        </li>
                    </Fragment>
                )}
            </ul>
        </nav>
    );
};

export default connect((state) => ({
    loggedUser: state.loggedUser,
    settings: state.forms.settings.data,
}))(NavBar);
