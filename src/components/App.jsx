import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../actions/ActionTypes";
import { appActions } from "../actions/AppActions";
import { loadNotifications } from "./../actions/NotificationsActions";
import SettingsActions from "../actions/SettingsActions";
import SchedulerActions from "./../actions/SchedulerActions";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Content from "./Content";
import Loader from "./common/Loader";
import "promise-polyfill/src/polyfill";
import $ from "jquery";

class App extends Component {
    applyDashboardLanguage() {
        const lang = this.props.forms.settings.data.default_language;
        $("html").attr({
            lang,
            dir: lang === "ar" ? "rtl" : "ltr",
            class: lang === "ar" ? "rtl" : "ltr",
        });
    }

    async componentDidMount() {
        const {
            loginUser,
            loadAppData,
            loadNotifications,
            loadScheduler,
            loadAppSettings,
            appLoaded,
        } = this.props;

        try {
            // Authenticate user
            await loginUser();

            // Load App Settings from the server
            await loadAppSettings();

            // Apply the selected language
            this.applyDashboardLanguage();

            // Load App Data (shows, episodes, users, etc...) from the server
            await loadAppData();

            // Make App loaded state true
            appLoaded();

            // Then load App Notifications
            await loadNotifications();

            // And load Shows Scheduler Data
            await loadScheduler();
        } catch (ex) {
            console.error(ex);
        }
    }

    render() {
        return this.props.loaded ? (
            <Fragment>
                <TopBar
                    user={this.props.loggedUser}
                    siteContent={this.props.forms.settings.data.site_content}
                />
                <SideBar />
                <Content />
            </Fragment>
        ) : (
            <Loader />
        );
    }
}

export default connect((state) => state, {
    ...appActions,
    loadNotifications,
    loadAppSettings: SettingsActions.onSettingsDataLoad,
    loadScheduler: SchedulerActions.onSchedulerLoad,
    appLoaded: () => ({ type: ACTIONS.APP_LOADED }),
})(App);
