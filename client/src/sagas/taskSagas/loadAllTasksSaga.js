import { takeEvery, select, call, put } from "redux-saga/es/effects";
import Axios from "axios";

import { LOAD_ALL_TASKS_START } from "../../store/actions/actionTypes";
import {
  loadAllTasksFail,
  loadAllTasksSuccess
} from "../../store/actions/actions";

function* loadAllTasks() {
  try {
    const userId = yield select(state => state.user.id);
    const link = `/api/users/${userId}/tasks`;

    const { data } = yield call(Axios.get, link);

    yield put(loadAllTasksSuccess(data));
  } catch (error) {
    yield put(loadAllTasksFail());
  }
}

function* watchLoadAllTasks() {
  yield takeEvery(LOAD_ALL_TASKS_START, loadAllTasks);
}

export default watchLoadAllTasks;
