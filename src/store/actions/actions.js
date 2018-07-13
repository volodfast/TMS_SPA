import {
  LOAD_ALL_TASKS_START,
  LOAD_ALL_TASKS_SUCCESS,
  LOAD_ALL_TASKS_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT
} from "./actionTypes";

// TASKS load

export const loadAllTasksStart = () => {
  return {
    type: LOAD_ALL_TASKS_START
  };
};

export const loadAllTasksSuccess = tasks => {
  return {
    type: LOAD_ALL_TASKS_SUCCESS,
    tasks: tasks
  };
};

export const loadAllTasksFail = errMsg => {
  return {
    type: LOAD_ALL_TASKS_FAIL,
    error: errMsg
  };
};

// AUTH actions

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (user, token) => {
  localStorage.setItem("tms-jwt", token);
  localStorage.setItem("tms-user-id", user.id);
  return {
    type: AUTH_SUCCESS,
    user: user
  };
};

export const authFail = errText => {
  return {
    type: AUTH_FAIL,
    error: errText
  };
};

export const logout = () => {
  localStorage.removeItem("tms-jwt");
  localStorage.removeItem("tms-user-id");
  return {
    type: LOGOUT
  };
};
