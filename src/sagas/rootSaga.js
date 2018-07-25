import { all } from "redux-saga/es/effects";

import watchDeleteTask from "./deleteTaskSaga";

export default function* rootSaga() {
  yield all([watchDeleteTask()]);
}
