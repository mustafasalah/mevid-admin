import React from "react";
import text from "../../langs/lang";
import SchedulerShow from "./SchedulerShow";

const daysText = text("full_days");
const daysMap = {
    sun: daysText[0],
    mon: daysText[1],
    tue: daysText[2],
    wed: daysText[3],
    thu: daysText[4],
    fri: daysText[5],
    sat: daysText[6],
};

const SchedulerDaySection = ({
    schedulers,
    shows,
    day,
    onShowDeleted,
    onShowUpdate,
}) => {
    let isGray = true;

    return (
        <section className="widget form day-shows">
            <h3 className="blur-shadow radius">
                <span>
                    <i className="fas fa-calendar-day"></i>
                    {text("lang_code") === "ar"
                        ? ` ${text("day_shows")} ${daysMap[day]}`
                        : ` ${daysMap[day]} ${text("shows")}`}
                </span>
            </h3>
            <div className="widget-content radius blur-shadow">
                {schedulers.length ? (
                    <ul>
                        {schedulers.map(({ id, showId, time }, i) => {
                            if (i % 3 === 0) isGray = !isGray;
                            return (
                                <SchedulerShow
                                    key={id}
                                    schedulerId={id}
                                    show={shows.find(
                                        (show) => show.id === showId
                                    )}
                                    time={time}
                                    isGray={isGray}
                                    onShowDeleted={onShowDeleted}
                                    onShowUpdate={onShowUpdate}
                                />
                            );
                        })}
                    </ul>
                ) : (
                    <p>
                        {text("there_are_no_scheduled_shows_on_this_day_yet")}
                    </p>
                )}
            </div>
        </section>
    );
};

export default SchedulerDaySection;
