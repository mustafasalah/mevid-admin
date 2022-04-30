import React from "react";
import { Link } from "react-router-dom";
import text from "../langs/lang";

const TopNavigation = ({ location }) => {
    const navItems = location.pathname
        .split("/")
        .slice(1)
        .map((item) => item.replace("-", "_"));

    return (
        <ol id="navigation">
            <li>
                <i className="fas fa-home"></i>{" "}
                <a href="/" target="_blank" rel="noreferrer">
                    {text("home")}
                </a>
            </li>

            {navItems.map((item, i) => (
                <li key={i}>
                    {i + 1 === navItems.length ? (
                        <strong>{text(item)}</strong>
                    ) : (
                        <Link to={"/" + item.toLowerCase()}>{text(item)}</Link>
                    )}
                </li>
            ))}
        </ol>
    );
};

export default TopNavigation;
