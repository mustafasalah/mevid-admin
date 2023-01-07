import React from "react";
import text from "../../langs/lang";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const SchedulerShow = ({
    schedulerId,
    show,
    time,
    isGray,
    onShowDeleted,
    onShowUpdate,
}) => {
    if (show === undefined) return null;

    return (
        <li className={isGray ? "gray" : ""}>
            <div className="show-poster">
                <a
                    href={`/shows/${show.id}`}
                    className="focus-shadow radius"
                    style={{ backgroundImage: `url('${show.poster}')` }}
                    title={show.name}
                ></a>
            </div>
            <div className="show-info">
                <dl>
                    <dt>{text("show_name")}:</dt>
                    <dd>
                        <a
                            href={`${HOSTNAME}/shows/${show.id}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {show.name}
                        </a>
                    </dd>

                    <dt>{text("show_time")}:</dt>
                    <dd>
                        <time dateTime={time}>{time} GMT</time>
                    </dd>
                </dl>
                <div className="day-show-actions">
                    <button
                        onClick={() =>
                            window.confirm(
                                text(
                                    "are_you_sure_to_delete_this_show_from_scheduler"
                                )
                            ) && onShowDeleted(schedulerId)
                        }
                        className="dark-btn focus-shadow radius-3"
                    >
                        {text("remove")}
                    </button>
                    <button
                        onClick={() => {
                            window.scrollTo(0, 0);
                            onShowUpdate(schedulerId);
                        }}
                        className="primary-btn focus-shadow radius-3"
                    >
                        {text("update")}
                    </button>
                </div>
            </div>
        </li>
    );
};

export default SchedulerShow;
