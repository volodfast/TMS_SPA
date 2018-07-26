import { takeEvery, select, call, put } from "redux-saga/es/effects";
import Axios from "axios";

import { UPDATE_ACTIVE_MULTIPLE_TASKS_START } from "../store/actions/actionTypes";

import {
  updateActiveMultipleTasksSuccess,
  updateActiveMultipleTasksFail
} from "../store/actions/actions";

function* updateActiveMultipleTasks(action) {
  try {
    const userId = yield select(state => state.user.id);
    const link = `/api/users/${userId}/tasks/change_active_multiple`;
    const { ids, isActive } = action;

    const { data } = yield call(Axios.put, link, {
      ids: ids,
      active: isActive
    });

    yield put(updateActiveMultipleTasksSuccess(data.ids, isActive));
  } catch (error) {
    yield put(updateActiveMultipleTasksFail());
  }
}

function* watchUpdateActiveMultipleTasks() {
  yield takeEvery(
    UPDATE_ACTIVE_MULTIPLE_TASKS_START,
    updateActiveMultipleTasks
  );
}

export default watchUpdateActiveMultipleTasks;
