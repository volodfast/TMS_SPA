import { takeEvery, select, call, put } from "redux-saga/es/effects";
import Axios from "axios";

import { EDIT_TASK_START } from "../../store/actions/actionTypes";
import { editTaskSuccess, editTaskFail } from "../../store/actions/actions";

import nav from "../../history/nav";

function* editTask(action) {
  try {
    const userId = yield select(state => state.user.id);
    const { task, taskId } = action;

    const link = `/api/users/${userId}/tasks/${taskId}`;

    const { data } = yield call(Axios.put, link, { task });

    yield put(editTaskSuccess(data));
    nav("/");
  } catch (error) {
    yield put(editTaskFail());
  }
}

function* watchEditTask() {
  yield takeEvery(EDIT_TASK_START, editTask);
}

export default watchEditTask;
