import { all } from "redux-saga/es/effects";

import watchDeleteTask from "./deleteTaskSaga";
import watchDeleteMultipleTasks from "./deleteMultipleTasksSaga";

export default function* rootSaga() {
  yield all([watchDeleteTask(), watchDeleteMultipleTasks()]);
}
