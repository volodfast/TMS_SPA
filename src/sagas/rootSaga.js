import { all } from "redux-saga/es/effects";

import watchDeleteTask from "./deleteTaskSaga";
import watchDeleteMultipleTasks from "./deleteMultipleTasksSaga";
import watchCreateTask from "./createTaskSaga";
import watchUpdateActiveMultipleTasks from "./updateActiveMultipleTasksSaga";

export default function* rootSaga() {
  yield all([
    watchDeleteTask(),
    watchDeleteMultipleTasks(),
    watchCreateTask(),
    watchUpdateActiveMultipleTasks()
  ]);
}
