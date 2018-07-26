import { takeEvery, select, put, call } from "redux-saga/es/effects";
import Axios from "axios";

import { DELETE_TASK_START } from "../store/actions/actionTypes";
import { deleteTaskSuccess, deleteTaskFail } from "../store/actions/actions";

import nav from "../history/nav";

function* deleteTask(action) {
  const { taskId } = action;
  const userId = yield select(state => state.user.id);
  const link = `/api/users/${userId}/tasks/${taskId}`;
  try {
    yield call(Axios.delete, link, {
      params: {
        id: taskId
      }
    });
    yield put(deleteTaskSuccess(taskId));
    nav("/");
  } catch (error) {
    yield put(deleteTaskFail());
  }
}

function* watchDeleteTask() {
  yield takeEvery(DELETE_TASK_START, deleteTask);
}

export default watchDeleteTask;
