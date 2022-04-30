import React from "react";
import { Link } from "react-router-dom";
import { authorize } from "../js/Utility";
import text from "../langs/lang";

const AddMenu = ({ loggedUser, siteContent, active, onClick }) => {
    return (
        <div
            className="top-bar-btn"
            id="add-btn"
            title={text("add_shows_and_pages")}
        >
            <button
                className={active ? "active" : ""}
                onClick={() => {
                    onClick(active ? "" : "addMenu");
                }}
            >
                <i className="fas fa-plus"></i>
            </button>
            <ul className="sub-menu blur-shadow">
                {(siteContent.includes("tvshows") ||
                    siteContent.includes("anime")) && (
                    <li>
                        <Link to="/episodes/add">
                            <i className="fas fa-plus"></i>{" "}
                            {text("add_episode")}
                        </Link>
                    </li>
                )}

                {siteContent.includes("movies") && (
                    <li>
                        <Link to="/shows/movies/add">
                            <i className="fas fa-plus"></i> {text("add_movie")}
                        </Link>
                    </li>
                )}

                {siteContent.includes("anime") && (
                    <li>
                        <Link to="/shows/anime/add">
                            <i className="fas fa-plus"></i> {text("add_anime")}
                        </Link>
                    </li>
                )}

                {siteContent.includes("tvshows") && (
                    <li>
                        <Link to="/shows/tv-shows/add">
                            <i className="fas fa-plus"></i>{" "}
                            {text("add_tv_show")}
                        </Link>
                    </li>
                )}

                {authorize(loggedUser.role, "admin") && (
                    <li>
                        <Link to="/pages/new">
                            <i className="fas fa-plus"></i>{" "}
                            {text("create_page")}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default AddMenu;
