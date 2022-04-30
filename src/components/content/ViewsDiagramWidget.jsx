import React, { useEffect } from "react";
import renderChartJS from "../../js/viewsChart";
import text from "../../langs/lang";

const ViewsDiagramWidget = () => {
    useEffect(() => {
        renderChartJS();
    }, []);

    return (
        <section className="widget" id="views-diagram">
            <header>
                <h3>
                    <span>
                        <i className="fas fa-chart-line"></i>{" "}
                        {text("views_diagram")}
                    </span>
                </h3>

                <select
                    className="widget-options radius-3"
                    id="diagram-control"
                    defaultValue="week"
                >
                    <option value="today">{text("today")}</option>
                    <option value="week">{text("this_week")}</option>
                    <option value="month">{text("this_month")}</option>
                    <option value="year">{text("this_year")}</option>
                </select>
            </header>
            <div className="widget-content radius blur-shadow">
                <canvas id="myChart"></canvas>
            </div>
        </section>
    );
};

export default ViewsDiagramWidget;
