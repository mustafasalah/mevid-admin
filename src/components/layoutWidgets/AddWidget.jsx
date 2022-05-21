import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import text from "../../langs/lang";

const getWidgetTypeOptions = (position) => {
    const widgetTypeOptions = [{ label: text("ads"), value: "ads" }];

    if (position === "main") {
        widgetTypeOptions.push({
            label: text("category_of_shows"),
            value: "category",
        });
    } else {
        widgetTypeOptions.push({
            label: text("picked_shows"),
            value: "selected_shows",
        });
    }

    return widgetTypeOptions;
};

const AddWidget = ({ onSubmit, position }) => {
    return (
        <FormSideSection
            label={text("add_widget")}
            id="add-widget"
            submitBtn={onSubmit}
        >
            <div className="row">
                <div className="col-1">
                    <FormField
                        name="layout.position"
                        label={text("widget_position")}
                        type="select"
                        placeholder={text("select_widget_position")}
                        options={[
                            {
                                label: text("main"),
                                value: "main",
                            },
                            {
                                label: text("sidebar"),
                                value: "sidebar",
                            },
                        ]}
                    />
                </div>
                <div className="col-1">
                    <FormField
                        name="layout.widgetType"
                        label={text("widget_type")}
                        type="select"
                        placeholder={text("select_widget_type")}
                        options={getWidgetTypeOptions(position)}
                    />
                </div>
            </div>
        </FormSideSection>
    );
};

export default AddWidget;
