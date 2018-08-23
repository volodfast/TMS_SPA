import { takeEvery, call, put } from "redux-saga/es/effects";
import Axios from "axios";

import { CREATE_USER_START } from "../../store/actions/actionTypes";
import { createUserSuccess, createUserFail } from "../../store/actions/actions";

import nav from "../../history/nav";

function* createUser(action) {
  try {
    const { user } = action;
    const link = `/api/users`;

    const { data } = yield call(Axios.post, link, {
      user
    });

    yield put(createUserSuccess(data));
    nav("/login");
  } catch (error) {
    yield put(createUserFail());
  }
}

function* watchCreateUser() {
  yield takeEvery(CREATE_USER_START, createUser);
}

export default watchCreateUser;
