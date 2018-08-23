import { takeLatest, call, put } from "redux-saga/es/effects";
import Axios from "axios";

import { AUTH_START } from "../../store/actions/actionTypes";
import {
  authFail,
  authSuccess,
  loadAllTasksStart
} from "../../store/actions/actions";

function* login(action) {
  try {
    if (action.email && action.password) {
      const { email, password } = action;
      const { data } = yield call(Axios.post, "/api/user_token", {
        auth: {
          email,
          password
        }
      });
      const { user, jwt } = data;
      Axios.defaults.headers["Authorization"] = "Bearer " + jwt;
      yield put(authSuccess(user, jwt));

      localStorage.setItem("tms-jwt", jwt);
      localStorage.setItem("tms-user-id", user.id);
      yield put(loadAllTasksStart());
    } else {
      const token = localStorage.getItem("tms-jwt");
      const userId = localStorage.getItem("tms-user-id");

      if (token && userId) {
        const baseUrl = `/api/users/${userId}`;
        const { data } = yield call(Axios.get, baseUrl, {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        Axios.defaults.headers["Authorization"] = "Bearer " + token;

        yield put(authSuccess(data, token));
        localStorage.setItem("tms-jwt", token);
        localStorage.setItem("tms-user-id", userId);

        yield put(loadAllTasksStart());
      } else {
        throw new Error("Can't log in!");
      }
    }
  } catch (error) {
    yield put(authFail());
  }
}

function* watchLogin() {
  yield takeLatest(AUTH_START, login);
}

export default watchLogin;
