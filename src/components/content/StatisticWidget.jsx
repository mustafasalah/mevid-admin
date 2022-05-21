import React from "react";
import { Link } from "react-router-dom";
import text from "../../langs/lang";

const StatisticWidget = ({ title, typeClass, data, faClass, moreLink }) => {
    let totalCounter = 0;

    return (
        <div className={`statistic radius focus-shadow ${typeClass}`}>
            <h3>
                <span>{title}</span>
            </h3>
            <div className="statistic-content">
                <div className="info-side">
                    <ul>
                        {data.map(({ label, counter }) => {
                            totalCounter += counter;
                            return (
                                <li key={label}>
                                    <span className="count">
                                        {String(counter).padStart(2, "0")}
                                    </span>{" "}
                                    {label}
                                </li>
                            );
                        })}
                        <li>
                            <span className="count">
                                {String(totalCounter).padStart(2, "0")}
                            </span>{" "}
                            {text("total")} {title}
                        </li>
                    </ul>
                </div>
                <div className="icon-details-side">
                    <i className={faClass}></i>
                    <Link to={moreLink} className="more-detials">
                        {text("more_detials")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StatisticWidget;
