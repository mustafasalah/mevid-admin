import React from "react";
import text from "../../langs/lang";

const mapTypes = new Map([
    ["link", text("custom_link")],
    ["category", text("a_category")],
    ["tag", text("a_tag")],
    ["genre", text("genre")],
    ["page", text("a_page")],
]);

const MenuItem = ({ item, onDelete, onEdit }) => {
    const { id, label, type, nested_in } = item;

    return (
        <div className="col-1">
            <div className="row">
                <div className="col-1">
                    <div className="field">
                        <div className="widget-box radius blur-shadow">
                            <h4>{label}</h4>

                            <i className="link-type" title={text("link_type")}>
                                {mapTypes.get(type)}
                            </i>
                            <div className="btns-wrapper">
                                <button
                                    title={text("edit_link")}
                                    type="button"
                                    className="edit-btn"
                                    onMouseUp={() => {
                                        onEdit(item);
                                        window.scrollTo(0, 0);
                                    }}
                                ></button>
                                <button
                                    title={text("delete_link")}
                                    type="button"
                                    className="delete-btn"
                                    onMouseUp={() => {
                                        onDelete(id, nested_in);
                                    }}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
