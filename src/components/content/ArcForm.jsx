import React from "react";
import text from "../../langs/lang";
import FormField from "../common/form/FormField";

const ArcForm = ({ data, onSubmit }) => {
    return (
        <div className="row radius">
            <div className="col-5-1">
                <FormField
                    label={text("arc_no")}
                    name="show.arcs.form.no"
                    type="number"
                    min="1"
                    placeholder={`${text("e.g.")} 01`}
                    required
                />
            </div>
            <div className="col-5-4">
                <div className="row">
                    <div className="col-5-4">
                        <FormField
                            label={text("arc_name")}
                            name="show.arcs.form.name"
                            type="text"
                            placeholder={`${text("e.g.")} Greed Island`}
                        />
                    </div>
                    <div className="col-5-1 center-col">
                        <button
                            type="button"
                            className="dark-btn radius-3 more-btn focus-shadow"
                            onClick={onSubmit}
                        >
                            {data.key === ""
                                ? ` ${text("add")}`
                                : ` ${text("update")}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArcForm;
