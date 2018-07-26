import { all } from "redux-saga/es/effects";

// Task sagas
import watchDeleteTask from "./taskSagas/deleteTaskSaga";
import watchDeleteMultipleTasks from "./taskSagas/deleteMultipleTasksSaga";
import watchCreateTask from "./taskSagas/createTaskSaga";
import watchUpdateActiveMultipleTasks from "./taskSagas/updateActiveMultipleTasksSaga";
import watchEditTask from "./taskSagas/editTaskSaga";

// User sagas
import watchEditUser from "./userSagas/editUserSaga";
import watchCreateUser from "./userSagas/createUserSaga";

export default function* rootSaga() {
  yield all([
    watchDeleteTask(),
    watchDeleteMultipleTasks(),
    watchCreateTask(),
    watchUpdateActiveMultipleTasks(),
    watchEditTask(),
    watchEditUser(),
    watchCreateUser()
  ]);
}
