import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import documentReducer from "./file/file.reducer";

const appReducer = combineReducers({
  routing: routerReducer,
  file: documentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
