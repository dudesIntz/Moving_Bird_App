import { put, takeLatest, call } from "redux-saga/effects";
//import axios from "@/Services/";
import authConstant from "./auth.constant";
import API from "../../../env.json";
import buildErrFromResponse from "../../Services/apiErrorHandler";
import { navigate } from "../../Navigators/Root";
import { DropDownHolder } from "../../Utils";
import axios from "axios";
import service from "../../Services";

export const authActions = {
  login: (data) => {
    return { type: authConstant.ASYNC_LOGIN, obj: data };
  },
  register: (data) => {
    return { type: authConstant.ASYNC_REGISTER, obj: data };
  },
  // logout: () => {
  //   return { type:  };
  // },
};

function* login({ obj }) {
  function request() {
    return { type: authConstant.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: authConstant.LOGIN_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: authConstant.LOGIN_FAILURE, payload: error };
  }
  yield put(request());
  try {
    const response = yield call(service.post, API.login, obj, {
      "Content-Type": "application/json",
    });

    // const data = yield fetch(API.login, {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(obj),
    // });
    // console.log(data, "data");
    // const response = yield data.json();
    console.log(response);
    const output = yield call(buildErrFromResponse, response);
    yield put(success({ data: output }));
    navigate("Main", { screen: "Home" });
  } catch (e) {
    console.log(e);
    DropDownHolder.alert("error", "Login Failure", JSON.stringify(e.message));
  }
}

function* register({ obj }) {
  function request() {
    return { type: authConstant.REGISTER_REQUEST };
  }
  function success(user) {
    return { type: authConstant.REGISTER_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: authConstant.REGISTER_FAILURE, payload: error };
  }
  yield put(request());
  try {
    const response = yield call(axios.post, API.register, obj);

    const output = yield call(buildErrFromResponse, response);
    yield put(success({ data: output }));
    navigate("Login", { screen: "Home" });
  } catch (e) {
    DropDownHolder.alert(
      "error",
      "Register Failure",
      JSON.stringify(e.message)
    );
    yield put(failure(e.message));
  }
}

export function* authSaga() {
  yield takeLatest(authConstant.ASYNC_LOGIN, login);
  yield takeLatest(authConstant.ASYNC_REGISTER, register);
}
