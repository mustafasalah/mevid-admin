import React from "react";
import { Link } from "react-router-dom";
import { authorize, upperFirst } from "../js/Utility";
import text from "../langs/lang";

const UserProfile = ({ user, active, onClick }) => {
    return (
        <div id="admin-profile">
            <div
                id="admin-avatar"
                className="blur-shadow"
                style={{ backgroundImage: `url('${user.profileImage}')` }}
            ></div>

            <button
                className={active ? "radius active" : "radius"}
                onClick={() => {
                    onClick(active ? "" : "userProfile");
                }}
            >
                <strong>{user.name}</strong>
                <small>{text(user.role)}</small>
            </button>

            <ul className="sub-menu blur-shadow">
                <li>
                    <a href="/account/profile" target="_blank" rel="noreferrer">
                        <i className="fas fa-user-circle"></i>{" "}
                        {text("my_profile")}
                    </a>
                </li>
                <li>
                    {authorize(user.role, "admin") ? (
                        <Link to={`/users/${user.id}`}>
                            <i className="fas fa-cog"></i>{" "}
                            {text("account_settings")}
                        </Link>
                    ) : (
                        <a
                            href="/account/settings"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="fas fa-cog"></i>{" "}
                            {text("account_settings")}
                        </a>
                    )}
                </li>
                <li>
                    <a href="/logout">
                        <i className="fas fa-sign-out-alt"></i>
                        {text("logout")}
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default UserProfile;
