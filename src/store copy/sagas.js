import { all } from "redux-saga/effects";
import { documentsSaga } from "./file/file.action";

export default function* rootSaga() {
  yield all([documentsSaga()]);
}
