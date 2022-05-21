import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import mainMenuActions from "../../actions/MainMenuActions";
import SectionHeader from "./../common/SectionHeader";
import runSortable from "../../js/Sortable";
import WidgetHeader from "./WidgetHeader";
import MenuItem from "./MenuItem";
import MainMenuForm from "./MainMenuForm";
import { usePrevious } from "./../../js/Utility";
import text from "../../langs/lang";

const MainMenu = ({
    menuItems,
    loadMenuData,
    sortMenuItems,
    deleteMenuItem,
    editMenuItem,
    editSubMenu,
}) => {
    useEffect(() => {
        // Load Menu data
        loadMenuData();
    }, []);

    const prevMenuItems = usePrevious(menuItems);

    useEffect(() => {
        if (prevMenuItems.length === 0 && menuItems.length !== 0) {
            // Run Sortable script
            const mainMenuSortable = runSortable(".main-menu-drop-zone");

            mainMenuSortable.on("sortable:sorted", async (e) => {
                sortMenuItems(
                    e.oldContainer.dataset.parentLinkId || null,
                    e.oldIndex,
                    e.newIndex
                );
            });
        }
    }, [menuItems]);

    return (
        <Fragment>
            <SectionHeader name={text("main_menu")} faClass="fas fa-list" />

            <div id="main-side">
                <div className="widget menu-widget form" id="layout">
                    <div className="widget-content radius">
                        <div className="row">
                            <div className="col-1">
                                <WidgetHeader title={text("menu_structure")} />
                            </div>

                            {menuItems.length === 0 ? (
                                <p className="not-available">
                                    {text(
                                        "there_are_no_links_added_in_the_main_menu_yet"
                                    )}
                                </p>
                            ) : (
                                <div className="col-1">
                                    <div className="row drop-zone main-menu-drop-zone">
                                        {menuItems.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                item={item}
                                                onEdit={(item) => {
                                                    editMenuItem(item);
                                                    editSubMenu(item.id);
                                                }}
                                                onDelete={(id, nestedIn) => {
                                                    const deleteIt =
                                                        window.confirm(
                                                            text(
                                                                "are_you_sure_to_delete_this_menu_item"
                                                            )
                                                        );
                                                    deleteIt &&
                                                        deleteMenuItem(
                                                            id,
                                                            nestedIn
                                                        );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div id="end-side">
                <MainMenuForm />
            </div>
        </Fragment>
    );
};

export default connect((state) => ({ menuItems: state.mainmenu }), {
    editSubMenu: mainMenuActions.editSubMenu,
    editMenuItem: mainMenuActions.editMenuItem,
    deleteMenuItem: mainMenuActions.deleteMenuItem,
    loadMenuData: mainMenuActions.loadMenuData,
    sortMenuItems: mainMenuActions.sortMenuItems,
})(MainMenu);
