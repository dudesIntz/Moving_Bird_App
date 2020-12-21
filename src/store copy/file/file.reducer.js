import fileConstant from "./file.constant";
import { combineReducers } from "redux";

const initialState = {
  uploadFileAndroidError: false,
  uploadFileAndroidSuccess: false,
  uploadFileAndroidLoading: false,

  uploadFileIOSError: false,
  uploadFileIOSSuccess: false,
  uploadFileIOSLoading: false,

  uploadFileWebAppError: false,
  uploadFileWebAppSuccess: false,
  uploadFileWebAppLoading: false,

  downloadAndroidError: false,
  downloadAndroidLoading: false,
  downloadAndroidSuccess: false,

  downloadIOSError: false,
  downloadIOSLoading: false,
  downloadIOSSuccess: false,
};

export function fileReducer(state = initialState, action) {
  const newState = { ...state };

  //upload file android action reducer
  if (action.type === fileConstant.UPLOAD_ANDROID_SUCCESS) {
    newState.uploadFileAndroidError = false;
    newState.uploadFileAndroidLoading = false;
    newState.uploadFileAndroidSuccess = true;
  }
  if (action.type === fileConstant.UPLOAD_IOS_FAILURE) {
    newState.uploadFileAndroidError = action.error;
    newState.uploadFileAndroidLoading = false;
  }
  if (action.type === fileConstant.UPLOAD_ANDROID_REQUEST) {
    newState.uploadFileAndroidError = false;
    newState.uploadFileAndroidLoading = true;
    newState.uploadFileAndroidSuccess = false;
  }

  //upload file ios action reducer
  if (action.type === fileConstant.UPLOAD_IOS_SUCCESS) {
    newState.uploadFileIOSError = false;
    newState.uploadFileIOSLoading = false;
    newState.uploadFileIOSSuccess = true;
  }
  if (action.type === fileConstant.UPLOAD_IOS_FAILURE) {
    newState.uploadFileIOSError = action.error;
    newState.uploadFileIOSLoading = false;
  }
  if (action.type === fileConstant.UPLOAD_IOS_REQUEST) {
    newState.uploadFileIOSError = false;
    newState.uploadFileIOSLoading = true;
    newState.uploadFileIOSSuccess = false;
  }

  //upload file webapp action reducer
  if (action.type === fileConstant.UPLOAD_WEB_APP_SUCCESS) {
    newState.uploadFileWebAppError = false;
    newState.uploadFileWebAppLoading = false;
    newState.uploadFileWebAppSuccess = true;
  }
  if (action.type === fileConstant.UPLOAD_WEB_APP_FAILURE) {
    newState.uploadFileWebAppError = action.error;
    newState.uploadFileWebAppLoading = false;
  }
  if (action.type === fileConstant.UPLOAD_WEB_APP_REQUEST) {
    newState.uploadFileWebAppError = false;
    newState.uploadFileWebAppLoading = true;
    newState.uploadFileWebAppSuccess = false;
  }

  //download android action reducer
  if (action.type === fileConstant.DOWNLOAD_ANDROID_SUCCESS) {
    newState.downloadAndroidError = false;
    newState.downloadAndroidLoading = false;
    newState.downloadAndroidSuccess = true;
  }
  if (action.type === fileConstant.DOWNLOAD_ANDROID_FAILURE) {
    newState.downloadAndroidError = action.error;
    newState.downloadAndroidLoading = false;
  }
  if (action.type === fileConstant.DOWNLOAD_ANDROID_REQUEST) {
    newState.downloadAndroidError = false;
    newState.downloadAndroidLoading = true;
  }

  //download android action reducer
  if (action.type === fileConstant.DOWNLOAD_IOS_SUCCESS) {
    newState.downloadIOSError = false;
    newState.downloadIOSLoading = false;
    newState.downloadIOSSuccess = true;
  }
  if (action.type === fileConstant.DOWNLOAD_IOS_FAILURE) {
    newState.downloadIOSError = action.error;
    newState.downloadIOSLoading = false;
  }
  if (action.type === fileConstant.DOWNLOAD_IOS_REQUEST) {
    newState.downloadIOSError = false;
    newState.downloadIOSLoading = true;
  }

  if (action.type === fileConstant.RESET_DOCUMENT) {
    newState.uploadFileAndroidError = false;
    newState.uploadFileAndroidLoading = false;
    newState.uploadFileAndroidSuccess = false;
    newState.downloadIOSError = false;
    newState.downloadIOSLoading = false;
    newState.downloadIOSSuccess = false;
    newState.downloadAndroidError = false;
    newState.downloadAndroidLoading = false;
    newState.downloadAndroidSuccess = false;

    newState.uploadFileIOSError = false;
    newState.uploadFileIOSLoading = false;
    newState.uploadFileIOSSuccess = false;

    newState.uploadFileWebAppError = false;
    newState.uploadFileWebAppLoading = false;
    newState.uploadFileWebAppSuccess = false;
  }

  return newState;
}

export default combineReducers({ fileReducer });
