import { takeEvery, select, put, call } from "redux-saga/es/effects";
import Axios from "axios";

import { CREATE_TASK_START } from "../../store/actions/actionTypes";
import { createTaskSuccess, createTaskFail } from "../../store/actions/actions";

import nav from "../../history/nav";

function* createTask(action) {
  const { task } = action;
  const userId = yield select(state => state.user.id);
  const link = `/api/users/${userId}/tasks`;

  try {
    const { data } = yield call(Axios.post, link, {
      task: task
    });
    yield put(createTaskSuccess(data));

    nav("/");
  } catch (error) {
    yield put(createTaskFail());
  }
}

function* watchCreateTask() {
  yield takeEvery(CREATE_TASK_START, createTask);
}

export default watchCreateTask;
