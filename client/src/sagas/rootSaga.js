import { all } from "redux-saga/es/effects";

// Auth sagas
import watchLogin from "./authSaga/loginSaga";

// User sagas
import watchCreateUser from "./userSagas/createUserSaga";
import watchEditUser from "./userSagas/editUserSaga";

// Task sagas
import watchCreateTask from "./taskSagas/createTaskSaga";
import watchEditTask from "./taskSagas/editTaskSaga";
import watchDeleteTask from "./taskSagas/deleteTaskSaga";
import watchDeleteMultipleTasks from "./taskSagas/deleteMultipleTasksSaga";
import watchUpdateActiveMultipleTasks from "./taskSagas/updateActiveMultipleTasksSaga";
import watchLoadAllTasks from "./taskSagas/loadAllTasksSaga";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchCreateUser(),
    watchEditUser(),
    watchCreateTask(),
    watchEditTask(),
    watchDeleteTask(),
    watchDeleteMultipleTasks(),
    watchUpdateActiveMultipleTasks(),
    watchLoadAllTasks()
  ]);
}
