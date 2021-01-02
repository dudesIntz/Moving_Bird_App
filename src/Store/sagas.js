import { all } from "redux-saga/effects";
import { authSaga } from "./auth/auth.action";

export default function* rootSaga() {
  yield all([authSaga()]);
}
