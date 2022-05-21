import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import text from "../../../langs/lang";

const FormSideSection = ({
    required,
    label,
    children,
    submitBtn = false,
    deleteBtn = false,
    extraContent,
    className = "radius",
    contentClass = "",
    headClass = "",
    ...props
}) => {
    const [opened, setOpened] = useState(true);
    const widgetContent = useRef(null);

    useEffect(() => {
        if (opened) {
            $(widgetContent.current).slideDown(400);
        } else {
            $(widgetContent.current).slideUp(400);
        }
    }, [opened]);

    return (
        <section className={`widget form ${className}`} {...props}>
            <h3
                className={headClass + (opened ? "" : " closed blur-shadow")}
                onClick={() => {
                    setOpened(!opened);
                }}
            >
                <span className={required ? "required" : ""}>{label}</span>
            </h3>

            <div
                className={`widget-content ${contentClass}`}
                ref={widgetContent}
            >
                {children}

                {submitBtn && (
                    <button
                        className="primary-btn focus-shadow radius"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if (typeof submitBtn === "function") {
                                submitBtn();
                            } else {
                                submitBtn.handler();
                            }
                        }}
                    >
                        {submitBtn.label || text("save_changes")}
                    </button>
                )}

                {deleteBtn && (
                    <button
                        className="dark-btn focus-shadow radius"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (typeof deleteBtn === "function") {
                                deleteBtn();
                            } else {
                                deleteBtn.handler();
                            }
                        }}
                    >
                        {deleteBtn.label || text("delete")}
                    </button>
                )}

                {extraContent}
            </div>
        </section>
    );
};

FormSideSection.defaultProps = {
    id: "",
    required: false,
};

export default FormSideSection;
