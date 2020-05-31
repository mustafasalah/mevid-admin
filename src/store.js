import { createStore } from "redux";
import AppReducer from "./reducers/AppReducer";

const store = createStore(
	AppReducer,
	// for debugging purposes
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
