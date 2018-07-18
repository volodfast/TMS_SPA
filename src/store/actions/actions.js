import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  LOAD_ALL_TASKS_START,
  LOAD_ALL_TASKS_SUCCESS,
  LOAD_ALL_TASKS_FAIL,
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  EDIT_TASK_START,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL
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

// Create_task actions

export const createTaskStart = () => {
  return {
    type: CREATE_TASK_START
  };
};

export const createTaskSuccess = task => {
  return {
    type: CREATE_TASK_SUCCESS,
    task: task
  };
};

export const createTaskFail = () => {
  return {
    type: CREATE_TASK_FAIL
  };
};

// Delete task actions

export const deleteTaskStart = () => {
  return {
    type: DELETE_TASK_START
  };
};

export const deleteTaskSuccess = taskId => {
  return {
    type: DELETE_TASK_SUCCESS,
    taskId: taskId
  };
};

export const deleteTaskFail = () => {
  return {
    type: DELETE_TASK_FAIL
  };
};

// Edit task actions

export const editTaskStart = () => {
  return {
    type: EDIT_TASK_START
  };
};
export const editTaskSuccess = task => {
  return {
    type: EDIT_TASK_SUCCESS,
    task: task
  };
};
export const editTaskFail = () => {
  return {
    type: EDIT_TASK_FAIL
  };
};

// Edit user actions

export const editUserStart = () => {
  return {
    type: EDIT_USER_START
  };
};

export const editUserSuccess = user => {
  return {
    type: EDIT_USER_SUCCESS,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  };
};

export const editUserFail = () => {
  return {
    type: EDIT_USER_FAIL
  };
};
