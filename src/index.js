import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./components/App";
import "normalize.css/normalize.css";
import "./css/forms.css";
import "./css/main-menu.css";
import "./css/layout-widgets.css";
import "./css/widget-settings.css";
import "./css/table.css";
import "./css/dashboard.css";
import "./css/scheduler.css";
import "./index.css";

ReactDOM.render(
	<BrowserRouter basename="/admin">
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById("root")
);
