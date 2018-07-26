import { all } from "redux-saga/es/effects";

import watchDeleteTask from "./taskSagas/deleteTaskSaga";
import watchDeleteMultipleTasks from "./taskSagas/deleteMultipleTasksSaga";
import watchCreateTask from "./taskSagas/createTaskSaga";
import watchUpdateActiveMultipleTasks from "./taskSagas/updateActiveMultipleTasksSaga";

export default function* rootSaga() {
  yield all([
    watchDeleteTask(),
    watchDeleteMultipleTasks(),
    watchCreateTask(),
    watchUpdateActiveMultipleTasks()
  ]);
}
