import loginConstant from "./auth.constant";
import { combineReducers } from "redux";

const initialState = {
  loginError: false,
  loginData: {},
  loginSuccess: false,
};

export function authReducer(state = initialState, action) {
  const newState = { ...state };

  //download android action reducer
  if (action.type === loginConstant.LOGIN_FAILURE) {
    newState.loginError = action.payload;
    newState.loginSuccess = false;
    newState.loginData = {};
    newState.isLoading = false;
  }
  if (action.type === loginConstant.LOGIN_SUCCESS) {
    newState.loginError = false;
    newState.loginSuccess = true;
    newState.loginData = action.payload;
    newState.isLoading = false;
  }
  if (action.type === loginConstant.LOGIN_REQUEST) {
    newState.loginError = false;
    newState.loginSuccess = false;
    newState.loginData = {};
    newState.isLoading = true;
  }

  return newState;
}

export default combineReducers({ authReducer });
