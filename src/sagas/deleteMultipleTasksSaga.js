import { call, takeEvery, put, select } from "redux-saga/es/effects";
import Axios from "axios";

import { DELETE_MULTIPLE_TASKS_START } from "../store/actions/actionTypes";
import {
  deleteMultipleTasksSuccess,
  deleteMultipleTasksFail
} from "../store/actions/actions";

function* deleteMultipleTasks(action) {
  const { taskIds } = action;
  const userId = yield select(state => state.user.id);

  const link = `/api/users/${userId}/tasks/delete_multiple`;

  try {
    yield call(Axios.delete, link, {
      params: {
        ids: taskIds
      }
    });

    yield put(deleteMultipleTasksSuccess(taskIds));
  } catch (error) {
    yield put(deleteMultipleTasksFail());
  }
}

function* watchDeleteMultipleTask() {
  yield takeEvery(DELETE_MULTIPLE_TASKS_START, deleteMultipleTasks);
}

export default watchDeleteMultipleTask;
