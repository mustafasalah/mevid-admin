import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNotification } from "../actions/NotificationsActions";
import { upperFirst } from "../js/Utility";
import text from "../langs/lang";

const countNotifications = (notifications) => {
    let counter = 0;

    notifications.forEach((notification) => {
        counter += +notification.counter;
    });
    return counter;
};

const Notification = ({
    active,
    onClick,
    notifications,
    deleteNotification,
}) => {
    const notificationsCount = countNotifications(notifications);

    const getNotificationMessage = (notification) => {
        if (notification.episode_id) {
            const { showName, episodeNo, episodeTitle } = notification;
            return `${showName} - ${text("the_episode")} ${episodeNo}${
                episodeTitle ? `: ${episodeTitle}` : ""
            }`;
        } else {
            return notification.showName;
        }
    };

    return (
        <div
            className="top-bar-btn"
            id="notify-btn"
            title={text("notifications_panel")}
        >
            <button
                className={active ? "active" : ""}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(active ? "" : "notification");
                }}
            >
                <i className="fas fa-bell">
                    {notificationsCount ? (
                        <span className="counter">{notificationsCount}</span>
                    ) : (
                        ""
                    )}
                </i>
            </button>
            <ul className="sub-menu blur-shadow">
                {notifications.length !== 0 ? (
                    notifications.map((notification) => {
                        return (
                            <li key={notification.id}>
                                <Link
                                    to={`/${notification.type}s`}
                                    onClick={() =>
                                        deleteNotification(notification.id)
                                    }
                                >
                                    <span
                                        className={`notify-label ${notification.type}`}
                                    >
                                        {`${
                                            notification.is_new === "1"
                                                ? text("new")
                                                : text("edited")
                                        } ${upperFirst(notification.type)}`}
                                    </span>
                                    <span className="counter">
                                        {notification.counter}
                                    </span>
                                    <p>
                                        {getNotificationMessage(notification)}
                                    </p>
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <p className="no-notifications">
                        {text("there_are_no_new_notifications_yet")}
                    </p>
                )}
            </ul>
        </div>
    );
};

export default connect(
    (state) => ({
        notifications: state.notifications,
    }),
    {
        deleteNotification,
    }
)(Notification);
