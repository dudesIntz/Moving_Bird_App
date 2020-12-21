import { put, takeLatest, call } from "redux-saga/effects";
import service from "../../services/service";
import environment from "../../index";
import fileConstant from "./file.constant";
import { buildErrFromResponse } from "../../utils/utils";

export const documentActions = {
  downloadAndroid: () => {
    return { type: fileConstant.ASYNC_DOWNLOAD_ANDROID };
  },
  downloadIOS: () => {
    return { type: fileConstant.ASYNC_DOWNLOAD_IOS };
  },

  uploadAndroid: (obj) => {
    return { type: fileConstant.ASYNC_UPLOAD_ANDROID, obj };
  },
  uploadIOS: (obj) => {
    return { type: fileConstant.ASYNC_UPLOAD_IOS, obj };
  },
  uploadwebApp: (obj) => {
    return { type: fileConstant.ASYNC_UPLOAD_WEB_APP, obj };
  },
  reset: () => {
    return { type: fileConstant.RESET_DOCUMENT };
  },
};

function* uploadIOS({ obj }) {
  function request() {
    return { type: fileConstant.UPLOAD_IOS_REQUEST };
  }
  function success(user) {
    return { type: fileConstant.UPLOAD_IOS_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: fileConstant.UPLOAD_IOS_FAILURE, error };
  }
  yield put(request());
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = yield call(
      service.post,
      environment.files.uploadIOS,
      obj.data,
      headers
    );

    const output = yield call(buildErrFromResponse, response);
    yield put(success({ data: output }));
  } catch (e) {
    yield put(failure(e.message));
  }
}

function* uploadAndroid({ obj }) {
  function request() {
    return { type: fileConstant.UPLOAD_ANDROID_REQUEST };
  }
  function success(user) {
    return { type: fileConstant.UPLOAD_ANDROID_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: fileConstant.UPLOAD_ANDROID_FAILURE, error };
  }
  yield put(request());
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const response = yield call(
      service.post,
      environment.files.uploadAndroid,
      obj.data,
      headers
    );

    const output = yield call(buildErrFromResponse, response);
    yield put(success({ data: output }));
  } catch (e) {
    yield put(failure(e.message));
  }
}

function* uploadWebApp({ obj }) {
  function request() {
    return { type: fileConstant.UPLOAD_WEB_APP_REQUEST };
  }
  function success(user) {
    return { type: fileConstant.UPLOAD_WEB_APP_SUCCESS, payload: user };
  }
  function failure(error) {
    return { type: fileConstant.UPLOAD_WEB_APP_FAILURE, error };
  }
  yield put(request());
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = yield call(
      service.post,
      environment.files.uploadWebApp,
      obj.data,
      headers
    );

    const output = yield call(buildErrFromResponse, response);
    console.log(output);
    yield put(success({ data: output }));
  } catch (e) {
    console.warn(e.message);
    yield put(failure(e.message));
  }
}

function* downloadAndroid() {
  function request() {
    return { type: fileConstant.DOWNLOAD_ANDROID_REQUEST };
  }
  function success(data) {
    return { type: fileConstant.DOWNLOAD_ANDROID_SUCCESS, payload: data };
  }
  function failure(error) {
    return { type: fileConstant.DOWNLOAD_ANDROID_FAILURE, error };
  }

  try {
    yield put(request());
    const response = yield call(service.get, environment.files.getAndroid, {
      responseType: "blob",
    });
    const output = yield call(buildErrFromResponse, response);

    let url = window.URL.createObjectURL(output);
    let a = document.createElement("a");
    a.href = url;
    a.download = "airasia.apk";
    a.click();
    yield put(success("success"));
  } catch (err) {
    yield put(failure(err.message));
  }
}

function* downloadIOS() {
  function request() {
    return { type: fileConstant.DOWNLOAD_IOS_REQUEST };
  }
  function success(data) {
    return { type: fileConstant.DOWNLOAD_IOS_SUCCESS, payload: data };
  }
  function failure(error) {
    return { type: fileConstant.DOWNLOAD_IOS_FAILURE, error };
  }

  try {
    yield put(request());
    const response = yield call(service.get, environment.files.getIOS, {
      responseType: "blob",
    });

    const output = yield call(buildErrFromResponse, response);

    let url = window.URL.createObjectURL(output);
    let a = document.createElement("a");
    a.href = url;
    a.download = "manifest.plist";
    a.click();
    yield put(success("success"));
  } catch (err) {
    yield put(failure(err.message));
  }
}

export function* documentsSaga() {
  yield takeLatest(fileConstant.ASYNC_DOWNLOAD_ANDROID, downloadAndroid);
  yield takeLatest(fileConstant.ASYNC_DOWNLOAD_IOS, downloadIOS);
  yield takeLatest(fileConstant.ASYNC_UPLOAD_IOS, uploadIOS);
  yield takeLatest(fileConstant.ASYNC_UPLOAD_ANDROID, uploadAndroid);
  yield takeLatest(fileConstant.ASYNC_UPLOAD_WEB_APP, uploadWebApp);
}
