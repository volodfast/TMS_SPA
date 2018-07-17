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
  CREATE_TASK_FAIL
} from "./actions/actionTypes";

const initialState = {
  auth: {
    authenticated: false,
    authenticating: false
  },
  user: {
    id: null,
    email: "",
    first_name: "",
    last_name: ""
  },
  tasks: {
    active: [],
    finished: [],
    loading: false,
    creation: {
      creating: false,
      created: false
    }
  },
  errors: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return auth_start(state, action);
    case AUTH_SUCCESS:
      return auth_success(state, action);
    case AUTH_FAIL:
      return auth_fail(state, action);
    case LOGOUT:
      return logout(state, action);
    case LOAD_ALL_TASKS_START:
      return load_all_tasks_start(state, action);
    case LOAD_ALL_TASKS_SUCCESS:
      return load_all_tasks_success(state, action);
    case LOAD_ALL_TASKS_FAIL:
      return load_all_tasks_fail(state, action);
    case CREATE_TASK_START:
      return create_task_start(state, action);
    case CREATE_TASK_SUCCESS:
      return create_task_success(state, action);
    case CREATE_TASK_FAIL:
      return create_task_fail(state, action);
    default:
      return state;
  }
}

// LOAD ALL TASKS reducer helpers

function load_all_tasks_start(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      loading: true
    }
  };
}

function load_all_tasks_success(state, action) {
  const tasks = action.tasks;

  const activeTasks = tasks.filter(task => {
    return task.active;
  });

  const finishedTasks = tasks.filter(task => {
    return !task.active;
  });

  return {
    ...state,
    tasks: {
      ...state.tasks,
      active: activeTasks,
      finished: finishedTasks,
      loading: false
    }
  };
}

function load_all_tasks_fail(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      loading: false
    }
  };
}

// AUTH reducer helpers

function auth_start(state, action) {
  return {
    ...state,
    auth: {
      ...state.auth,
      authenticating: true
    }
  };
}

function auth_success(state, action) {
  return {
    ...state,
    auth: {
      ...state.auth,
      authenticated: true,
      authenticating: false
    },
    user: {
      ...state.user,
      ...action.user
    }
  };
}

function auth_fail(state, action) {
  return {
    ...state,
    auth: {
      ...state.auth,
      authenticating: false
    },
    errors: [...state.errors, action.error]
  };
}

function logout(state, action) {
  return initialState;
}

// Create task reducer handlers

function create_task_start(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      creation: {
        creating: true,
        created: false
      }
    }
  };
}

function create_task_success(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      active: [action.task, ...state.tasks.active],
      creation: {
        creating: false,
        created: true
      }
    }
  };
}

function create_task_fail(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      creation: {
        creating: false,
        created: false
      }
    }
  };
}
