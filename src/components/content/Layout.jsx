import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SectionHeader from "./../common/SectionHeader";
import layoutActions from "./../../actions/LayoutActions";
import runSortable from "../../js/Sortable";
import WidgetSection from "./WidgetSection";
import Widget from "./Widget";
import { sortLayout } from "../services/layoutServices";
import { toast } from "react-toastify";
import WidgetsWrapper from "./WidgetsWrapper";
import Loader from "./../common/Loader";
import text from "../../langs/lang";

class Layout extends Component {
    async onSortedHandler({
        newContainer: { id: containerId },
        oldIndex,
        newIndex,
    }) {
        const { onLayoutSorted } = this.props;
        const dropzone = containerId.slice(0, containerId.indexOf("-"));
        onLayoutSorted(dropzone, oldIndex, newIndex);

        try {
            await sortLayout(dropzone, { oldIndex, newIndex });
        } catch (ex) {
            // alert error message
            toast.error(ex.response.data);

            // reverse changes
            onLayoutSorted(dropzone, newIndex, oldIndex);
        }
    }

    state = {
        activeWidget: null,
    };

    headerWidgetsTitleTranslated = false;

    initialSortable() {
        // Run Sortable script
        const { mainSortable, sidebarSortable, footerSortable } = runSortable();

        const { onSortedHandler } = this;
        mainSortable.on("sortable:sorted", onSortedHandler.bind(this));
        sidebarSortable.on("sortable:sorted", onSortedHandler.bind(this));
        footerSortable.on("sortable:sorted", onSortedHandler.bind(this));
    }

    componentDidMount() {
        // Load layout data
        this.props.loadLayoutData();

        // Initial Sortable
        this.initialSortable();
    }

    componentDidUpdate({ header }) {
        // inital sortable for first time after layout data is loaded
        if (header.length === 0 && this.props.header.length !== 0) {
            this.initialSortable();
        }
    }

    render() {
        const { header, main, sidebar, footer, layoutForm } = this.props;

        return (
            <Fragment>
                <SectionHeader
                    name={text("layout_and_view")}
                    faClass="fas fa-brush"
                />
                <div id="main-side">
                    {header.length === 0 ? (
                        <Loader />
                    ) : (
                        <div className="widget form" id="layout">
                            <div className="widget-content radius">
                                <div className="row">
                                    <WidgetSection title={text("header")}>
                                        <Widget
                                            data={{
                                                title: text("main_menu"),
                                                type: "main-menu",
                                                enabled: "1",
                                            }}
                                            position="header"
                                            onClick={() => {
                                                this.props.history.push(
                                                    "/layout/main-menu"
                                                );
                                            }}
                                        />
                                        {header.map((widget, i) => (
                                            <Widget
                                                key={widget.id}
                                                data={widget}
                                                position="header"
                                                isActive={
                                                    this.state.activeWidget ===
                                                    widget.id
                                                }
                                                onClick={() => {
                                                    this.setState({
                                                        activeWidget: widget.id,
                                                    });
                                                }}
                                            />
                                        ))}
                                    </WidgetSection>
                                </div>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="row">
                                            <WidgetSection
                                                title={text("main_content")}
                                                dropzone="main-drop-zone"
                                                sectionName="main"
                                                addWidget="main"
                                                removeActive={() =>
                                                    this.setState({
                                                        activeWidget: null,
                                                    })
                                                }
                                            >
                                                {main.map((widget) => (
                                                    <Widget
                                                        key={widget.id}
                                                        data={widget}
                                                        position="main"
                                                        isActive={
                                                            this.state
                                                                .activeWidget ===
                                                            widget.id
                                                        }
                                                        onClick={() => {
                                                            this.setState({
                                                                activeWidget:
                                                                    widget.id,
                                                            });
                                                        }}
                                                    />
                                                ))}
                                            </WidgetSection>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="row">
                                            <WidgetSection
                                                title={text("sidebar_content")}
                                                dropzone="sidebar-drop-zone"
                                                addWidget="sidebar"
                                                removeActive={() =>
                                                    this.setState({
                                                        activeWidget: null,
                                                    })
                                                }
                                            >
                                                {sidebar.map((widget) => (
                                                    <Widget
                                                        key={widget.id}
                                                        data={widget}
                                                        position="sidebar"
                                                        isActive={
                                                            this.state
                                                                .activeWidget ===
                                                            widget.id
                                                        }
                                                        onClick={() => {
                                                            this.setState({
                                                                activeWidget:
                                                                    widget.id,
                                                            });
                                                        }}
                                                    />
                                                ))}
                                            </WidgetSection>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <WidgetSection
                                        title={text("footer")}
                                        dropzone="footer-drop-zone"
                                    >
                                        {footer.map((widget) => (
                                            <Widget
                                                key={widget.id}
                                                data={widget}
                                                position="footer"
                                                isActive={
                                                    this.state.activeWidget ===
                                                    widget.id
                                                }
                                                onClick={() => {
                                                    this.setState({
                                                        activeWidget: widget.id,
                                                    });
                                                }}
                                            />
                                        ))}
                                    </WidgetSection>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div id="end-side">
                    <WidgetsWrapper
                        widget={layoutForm}
                        onUpdate={this.props.onUpdateLayoutWidget}
                        onDelete={(data) => {
                            const deleteIt = window.confirm(
                                text("are_you_sure_to_delete_this_widget")
                            );
                            if (deleteIt) {
                                this.props.onDeleteWidget(data);
                                this.setState({
                                    activeWidget: null,
                                });
                            }
                        }}
                        onAddWidget={this.props.onAddWidget}
                    />
                </div>
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({ layoutForm: state.forms.layout.data, ...state.layout }),
    {
        loadLayoutData: layoutActions.loadLayoutData,
        onLayoutSorted: layoutActions.sortLayout,
        onUpdateLayoutWidget: layoutActions.updateLayoutWidget,
        onAddWidget: layoutActions.addWidget,
        onDeleteWidget: layoutActions.deleteWidget,
    }
)(Layout);
