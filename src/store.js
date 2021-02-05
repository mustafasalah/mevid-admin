import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import AppReducer from "./reducers/AppReducer";

const store = createStore(AppReducer, applyMiddleware(promiseMiddleware));

export default store;
