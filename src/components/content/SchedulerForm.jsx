import React from "react";
import text from "../../langs/lang";
import Select from "./../common/form/Select";

const SchedulerForm = ({
    shows,
    data,
    schedulers,
    onShowAdded,
    onShowUpdated,
    onFieldUpdate,
}) => {
    const daysText = text("full_days");
    const daysMap = new Map([
        ["sun", daysText[0]],
        ["mon", daysText[1]],
        ["tue", daysText[2]],
        ["wed", daysText[3]],
        ["thu", daysText[4]],
        ["fri", daysText[5]],
        ["sat", daysText[6]],
    ]);

    function isFormFilled() {
        const { showId, day, time } = data;
        return showId !== "" && day !== "" && time !== "";
    }

    function handleSubmit(e) {
        // Prevent Default Form Submition Action
        e.preventDefault();

        if (!isFormFilled()) return;

        const { showId, day, time } = data;

        if (data.id === null) {
            onShowAdded(showId, day, time);
        } else {
            onShowUpdated(data.id, day, time);
        }
    }

    return (
        <div className="widget form radius" id="show-scheduler-form">
            <h3>
                <span>
                    <i className="fas fa-calendar-plus"></i>{" "}
                    {text("schedule_shows")}
                </span>
            </h3>
            <div className="widget-content radius">
                <form id="scheduler-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-4-2">
                            <div className="field">
                                <label htmlFor="show-name">
                                    {text("select_show")}
                                </label>
                                <Select
                                    className="select2"
                                    name="show-name"
                                    id="show-name"
                                    value={data.showId}
                                    options={[
                                        {
                                            label: text(
                                                "select_show_to_schedule"
                                            ),
                                            value: "",
                                        },
                                        ...shows.map(({ id, name }) => ({
                                            label: name,
                                            value: id,
                                        })),
                                    ]}
                                    onChange={(select) => {
                                        const showId = select.value;
                                        const showScheduler = schedulers.find(
                                            (scheduler) =>
                                                scheduler.showId == showId
                                        );
                                        if (showScheduler) {
                                            onFieldUpdate(
                                                ["id", "showId", "day", "time"],
                                                showScheduler
                                            );
                                        } else {
                                            onFieldUpdate(
                                                ["id", "showId", "day", "time"],
                                                {
                                                    id: null,
                                                    showId,
                                                    day: "",
                                                    time: "",
                                                }
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-4-2">
                            <div className="row">
                                <div className="col-2">
                                    <div className="field date">
                                        <label htmlFor="show-day">
                                            {text("the_day")}
                                        </label>
                                        <Select
                                            name="show-day"
                                            id="show-day"
                                            className="select2"
                                            value={data.day}
                                            options={[
                                                {
                                                    label: text(
                                                        "select_the_show_day"
                                                    ),
                                                    value: "",
                                                },
                                                ...[...daysMap].map(
                                                    ([value, label]) => ({
                                                        label,
                                                        value,
                                                    })
                                                ),
                                            ]}
                                            onChange={(select) =>
                                                onFieldUpdate(
                                                    "day",
                                                    select.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="field time">
                                        <label htmlFor="show-time">
                                            {text("show_time")}
                                        </label>
                                        <input
                                            name="show-time"
                                            id="show-time"
                                            type="time"
                                            value={data.time}
                                            onChange={({
                                                currentTarget: input,
                                            }) =>
                                                onFieldUpdate(
                                                    "time",
                                                    input.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="primary-btn more-btn radius focus-shadow"
                        disabled={!isFormFilled()}
                    >
                        {` ${text("update_scheduler")}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SchedulerForm;
