import { createStore, compose, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import AppReducer from "./reducers/AppReducer";

const store = createStore(
	AppReducer,
	compose(
		applyMiddleware(promiseMiddleware),
		// for debugging purposes
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
