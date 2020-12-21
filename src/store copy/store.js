import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import rootSaga from "./sagas";
import rootReducer from "./rootReducer";
import environment from "environment";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const browserHistory = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTER_BASE || environment.basePath || ""
});

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
