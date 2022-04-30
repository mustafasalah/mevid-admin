import React, { Component } from "react";
import text from "../../langs/lang";

class TableActions extends Component {
    render() {
        const { actions, selectedAction, onActionChange, onActionApply } =
            this.props;

        return (
            <div id="action-control">
                <select
                    name="action"
                    value={selectedAction}
                    onChange={({ currentTarget: select }) =>
                        onActionChange(select.value)
                    }
                    className="radius-3"
                >
                    <option value="">{text("select_action")}</option>
                    {actions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <button
                    id="apply-action-btn"
                    onClick={() => onActionApply(actions)}
                    className="radius-3"
                >
                    {text("apply")}
                </button>
            </div>
        );
    }
}

export default TableActions;
