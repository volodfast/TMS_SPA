import { takeEvery, select, call, put } from "redux-saga/es/effects";
import Axios from "axios";

import { EDIT_USER_START } from "../../store/actions/actionTypes";
import { editUserSuccess, editUserFail } from "../../store/actions/actions";

import nav from "../../history/nav";

function* editUser(action) {
  try {
    const { user } = action;
    const userId = yield select(state => state.user.id);
    const link = `/api/users/${userId}`;
    const { data } = yield call(Axios.put, link, { user });

    yield put(editUserSuccess(data));
    nav("/");
  } catch (error) {
    yield put(editUserFail());
  }
}

function* watchEditUser() {
  yield takeEvery(EDIT_USER_START, editUser);
}

export default watchEditUser;
