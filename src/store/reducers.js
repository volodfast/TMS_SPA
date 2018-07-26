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
  EDIT_USER_FAIL,
  CREATE_USER_START,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  DELETE_MULTIPLE_TASKS_START,
  DELETE_MULTIPLE_TASKS_SUCCESS,
  DELETE_MULTIPLE_TASKS_FAIL,
  UPDATE_ACTIVE_MULTIPLE_TASKS_START,
  UPDATE_ACTIVE_MULTIPLE_TASKS_SUCCESS,
  UPDATE_ACTIVE_MULTIPLE_TASKS_FAIL,
  CHANGE_TASKS_ACTIVE_TAB,
  ADD_SELECTED_ACTIVE_TASK_IDS_TO_CACHE,
  ADD_SELECTED_FINISHED_TASK_IDS_TO_CACHE,
  CHANGE_ACTIVE_TABLE_SORT,
  CHANGE_FINISHED_TABLE_SORT
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
    last_name: "",
    creation: {
      creating: false,
      created: false
    },
    editing: {
      updating: false,
      updated: false
    }
  },
  tasks: {
    active: [],
    finished: [],
    activeTableSort: {
      by: "priority",
      how: "desc"
    },
    finishedTableSort: {
      by: "priority",
      how: "desc"
    },
    loading: false,
    activeTab: "active",
    creation: {
      creating: false,
      created: false
    },
    deletion: {
      deleting: false,
      deleted: false
    },
    editing: {
      updating: false,
      updated: false
    },
    multipleDeletion: {
      deleting: false,
      deleted: true
    },
    multipleUpdating: {
      updating: false,
      updated: true
    }
  },
  cache: {
    selectedIds: {
      active: [],
      finished: []
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

    case DELETE_TASK_START:
      return delete_task_start(state, action);
    case DELETE_TASK_SUCCESS:
      return delete_task_success(state, action);
    case DELETE_TASK_FAIL:
      return delete_task_fail(state, action);

    case EDIT_TASK_START:
      return edit_task_start(state, action);
    case EDIT_TASK_SUCCESS:
      return edit_task_success(state, action);
    case EDIT_TASK_FAIL:
      return edit_task_fail(state, action);

    case EDIT_USER_START:
      return edit_user_start(state, action);
    case EDIT_USER_SUCCESS:
      return edit_user_success(state, action);
    case EDIT_USER_FAIL:
      return edit_user_fail(state, action);

    case CREATE_USER_START:
      return create_user_start(state, action);
    case CREATE_USER_SUCCESS:
      return create_user_success(state, action);
    case CREATE_USER_FAIL:
      return create_user_fail(state, action);

    case DELETE_MULTIPLE_TASKS_START:
      return delete_multiple_tasks_start(state, action);
    case DELETE_MULTIPLE_TASKS_SUCCESS:
      return delete_multiple_tasks_success(state, action);
    case DELETE_MULTIPLE_TASKS_FAIL:
      return delete_multiple_tasks_fail(state, action);

    case UPDATE_ACTIVE_MULTIPLE_TASKS_START:
      return update_active_multiple_tasks_start(state, action);
    case UPDATE_ACTIVE_MULTIPLE_TASKS_SUCCESS:
      return update_active_multiple_tasks_success(state, action);
    case UPDATE_ACTIVE_MULTIPLE_TASKS_FAIL:
      return update_active_multiple_tasks_fail(state, action);

    case CHANGE_TASKS_ACTIVE_TAB:
      return change_tasks_active_tab(state, action);

    case ADD_SELECTED_ACTIVE_TASK_IDS_TO_CACHE:
      return add_selected_active_task_ids_to_cache(state, action);
    case ADD_SELECTED_FINISHED_TASK_IDS_TO_CACHE:
      return add_selected_finished_task_ids_to_cache(state, action);

    case CHANGE_ACTIVE_TABLE_SORT:
      return change_active_table_sort(state, action);
    case CHANGE_FINISHED_TABLE_SORT:
      return change_finished_table_sort(state, action);

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
      authenticating: true,
      authenticated: false
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
      authenticating: false,
      authenticated: false
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

// Delete task reducer helpers

function delete_task_start(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      deletion: {
        deleting: true,
        deleted: false
      }
    }
  };
}

function delete_task_success(state, action) {
  const taskId = action.taskId;
  const activeTasks = state.tasks.active;
  const finishedTasks = state.tasks.finished;

  const filteredActiveTasks = activeTasks.filter(task => {
    if (task.id === taskId) return false;
    return true;
  });

  const filteredFinishedTasks = finishedTasks.filter(task => {
    if (task.id === taskId) return false;
    return true;
  });
  return {
    ...state,
    tasks: {
      ...state.tasks,
      active: filteredActiveTasks,
      finished: filteredFinishedTasks,
      deletion: {
        deleting: false,
        deleted: false
      }
    }
  };
}

function delete_task_fail(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      deletion: {
        deleting: false,
        deleted: true
      }
    }
  };
}

// Edit task reducer helpers

function edit_task_start(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      editing: {
        updating: true,
        updated: false
      }
    }
  };
}

function edit_task_success(state, action) {
  const updatedTask = action.task;
  const activeTasks = state.tasks.active;
  const finishedTasks = state.tasks.finished;

  const updatedActiveTasks = activeTasks.map(task => {
    if (task.id === updatedTask.id) {
      return updatedTask;
    }
    return task;
  });

  const updatedFinishedTasks = finishedTasks.map(task => {
    if (task.id === updatedTask.id) {
      return updatedTask;
    }
    return task;
  });

  return {
    ...state,
    tasks: {
      ...state.tasks,
      active: updatedActiveTasks,
      finished: updatedFinishedTasks,
      editing: {
        updating: false,
        updated: true
      }
    }
  };
}

function edit_task_fail(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      editing: {
        updating: false,
        updated: false
      }
    }
  };
}

// Edit user reducer helpers

function edit_user_start(state, action) {
  return {
    ...state,
    user: {
      ...state.user,
      editing: {
        updating: true,
        updated: false
      }
    }
  };
}

function edit_user_success(state, action) {
  const { user } = action;
  return {
    ...state,
    user: {
      ...state.user,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      editing: {
        updating: false,
        updated: true
      }
    }
  };
}

function edit_user_fail(state, action) {
  return {
    ...state,
    user: {
      ...state.user,
      editing: {
        updating: false,
        updated: false
      }
    }
  };
}

// Create user reducer helpers

function create_user_start(state, action) {
  return {
    ...state,
    user: {
      ...state.user,
      creation: {
        creating: true,
        created: false
      }
    }
  };
}

function create_user_success(state, action) {
  const { user } = action;
  return {
    ...state,
    user: {
      ...state.user,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      creation: {
        creating: true,
        created: false
      }
    }
  };
}

function create_user_fail(state, action) {
  return {
    ...state,
    user: {
      ...state.user,
      creation: {
        creating: false,
        created: false
      }
    }
  };
}

// Delete multiple users reducer helpers

function delete_multiple_tasks_start(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      multipleDeletion: {
        deleting: true,
        deleted: false
      }
    }
  };
}

function delete_multiple_tasks_success(state, action) {
  const ids = action.ids;

  const activeTasks = state.tasks.active.filter(task => {
    if (ids.includes(task.id)) return false;
    return true;
  });

  const finishedTasks = state.tasks.finished.filter(task => {
    if (ids.includes(task.id)) return false;
    return true;
  });

  return {
    ...state,
    tasks: {
      ...state.tasks,
      active: activeTasks,
      finished: finishedTasks,
      multipleDeletion: {
        deleting: false,
        deleted: true
      }
    }
  };
}

function delete_multiple_tasks_fail(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      multipleDeletion: {
        deleting: false,
        deleted: false
      }
    }
  };
}

// Update active multiple users reducer helpers

function update_active_multiple_tasks_start(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      multipleUpdating: {
        updating: true,
        updated: false
      }
    }
  };
}

function update_active_multiple_tasks_success(state, action) {
  const isActive = action.isActive;
  const ids = action.ids;

  let tasks;
  if (isActive) {
    tasks = state.tasks.finished.filter(task => {
      if (ids.includes(task.id)) return true;
      return false;
    });
  } else {
    tasks = state.tasks.active.filter(task => {
      if (ids.includes(task.id)) return true;
      return false;
    });
  }

  tasks = tasks.map(task => {
    task.active = isActive;
    return task;
  });

  let activeTasks;
  let finishedTasks;

  if (isActive) {
    // if tasks now active - filter finished tasks
    finishedTasks = state.tasks.finished.filter(task => {
      if (ids.includes(task.id)) return false;
      return true;
    });

    activeTasks = state.tasks.active.concat(tasks);
  } else {
    activeTasks = state.tasks.active.filter(task => {
      if (ids.includes(task.id)) return false;
      return true;
    });
    finishedTasks = state.tasks.finished.concat(tasks);
  }

  return {
    ...state,
    tasks: {
      ...state.tasks,
      active: activeTasks,
      finished: finishedTasks,
      multipleUpdating: {
        updating: false,
        updated: true
      }
    }
  };
}

function update_active_multiple_tasks_fail(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      multipleUpdating: {
        updating: false,
        updated: false
      }
    }
  };
}

// Change tasks active tab reducer helper

function change_tasks_active_tab(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      activeTab: action.activeTab
    }
  };
}

// Add selected task ids to cache reducer helpers

function add_selected_active_task_ids_to_cache(state, action) {
  return {
    ...state,
    cache: {
      ...state.cache,
      selectedIds: {
        ...state.cache.selectedIds,
        active: action.ids
      }
    }
  };
}

function add_selected_finished_task_ids_to_cache(state, action) {
  return {
    ...state,
    cache: {
      ...state.cache,
      selectedIds: {
        ...state.cache.selectedIds,
        finished: action.ids
      }
    }
  };
}

// Change sorting of active and finsihed tables reduce helpers

function change_active_table_sort(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      activeTableSort: {
        how: action.how,
        by: action.by
      }
    }
  };
}

function change_finished_table_sort(state, action) {
  return {
    ...state,
    tasks: {
      ...state.tasks,
      finishedTableSort: {
        how: action.how,
        by: action.by
      }
    }
  };
}
