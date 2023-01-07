import React from "react";
import text from "../../langs/lang";

const LinksList = ({
    title = text("current_links_list"),
    links,
    onMove,
    onEdit,
    onDelete,
    forSubMenu = false,
}) => {
    return (
        <div className="field">
            <label>{title}</label>
            {links.length === 0 ? (
                <p className="not-available radius">{text("no_links_yet")}</p>
            ) : (
                <ul id="current-links-list" className="blur-shadow radius">
                    {links.map((link, i) => (
                        <li key={link.label + i}>
                            <span className="link-name">{link.label}</span>
                            <div className="btns-wrapper">
                                <button
                                    type="button"
                                    className="move-btn down-btn"
                                    title={text("move_down")}
                                    onClick={() => {
                                        if (forSubMenu) {
                                            onMove(
                                                i + 1,
                                                link.nested_in,
                                                "down"
                                            );
                                        } else {
                                            onMove(i, "down");
                                        }
                                    }}
                                ></button>
                                <button
                                    type="button"
                                    className="move-btn up-btn"
                                    title={text("move_up")}
                                    onClick={() => {
                                        if (forSubMenu) {
                                            onMove(i + 1, link.nested_in, "up");
                                        } else {
                                            onMove(i, "up");
                                        }
                                    }}
                                ></button>
                                <button
                                    type="button"
                                    className="edit-btn"
                                    title={text("edit_link")}
                                    onClick={() => onEdit(link, i)}
                                ></button>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    title={text("delete_link")}
                                    onClick={() => {
                                        const deleteIt = window.confirm(
                                            text(
                                                "are_you_sure_to_delete_this_link"
                                            )
                                        );

                                        if (deleteIt) {
                                            if (forSubMenu) {
                                                onDelete(
                                                    link.id,
                                                    link.nested_in
                                                );
                                            } else {
                                                onDelete(i);
                                            }
                                        }
                                    }}
                                ></button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LinksList;
