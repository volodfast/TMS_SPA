import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import TaskTableControls from "./TaskTableControls/TaskTableControls";
import TaskTable from "./TaskTable/TaskTable";

import * as actions from "../../store/actions/actions";

class TaskTableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIds: []
    };

    this.onToggleSelect = this.onToggleSelect.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.uncheckAll = this.uncheckAll.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  onToggleSelect(id) {
    if (this.state.selectedIds.includes(id)) {
      this.setState(state => {
        return {
          selectedIds: state.selectedIds.filter(taskId => {
            if (taskId === id) return false;
            return true;
          })
        };
      });
      return;
    }

    this.setState(state => {
      return {
        selectedIds: state.selectedIds.concat(id)
      };
    });
  }

  checkAll() {
    this.setState((state, props) => {
      const selectedIds = props.tasks.map(task => task.id);
      return {
        selectedIds
      };
    });
  }

  uncheckAll() {
    this.setState((state, props) => {
      return {
        selectedIds: []
      };
    });
  }

  deleteSelected(e) {
    e.preventDefault();
    const userId = this.props.userId;
    const taskIds = this.state.selectedIds.concat();

    if (taskIds.length === 0) return;

    const link = `/api/users/${userId}/tasks/delete_multiple`;

    this.props.deleteMultipleTasksStart();
    Axios.delete(link, {
      params: {
        ids: taskIds
      }
    })
      .then(res => {
        this.props.deleteMultipleTasksSuccess(taskIds);
      })
      .catch(err => {
        console.log("FAIL DELETE");
        console.dir(err);
        this.props.deleteMultipleTasksFail();
      });
  }

  deleteTask(id) {
    const userId = this.props.userId;
    const taskId = id;
    const link = `/api/users/${userId}/tasks/${taskId}`;

    this.props.deleteTaskStart();
    Axios.delete(link, {
      params: {
        id: taskId
      }
    })
      .then(res => {
        this.props.deleteTaskSuccess(taskId);
      })
      .catch(err => {
        console.log("FAIL DELETE");
        console.dir(err);
        this.props.deleteTaskFail();
      });
  }

  render() {
    const tasksLength = this.props.tasks ? this.props.tasks.length : null;

    const options = this.props.handleSelected;

    let button = null;

    if (this.props.handleSelected) {
      button = (
        <button
          className={options.classes}
          onClick={() => {
            options.handler(this.state.selectedIds);
          }}
        >
          {options.text}
        </button>
      );
    }

    return (
      <div>
        <TaskTableControls
          tasksNum={tasksLength}
          text={this.props.text}
          checkAll={this.checkAll}
          uncheckAll={this.uncheckAll}
          deleteSelected={this.deleteSelected}
          button={button}
        />
        <TaskTable
          tasks={this.props.tasks}
          selectedTaskIds={this.state.selectedIds}
          onToggleSelect={this.onToggleSelect}
          deleteTask={this.deleteTask}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMultipleTasksStart: () => {
      dispatch(actions.deleteMultipleTasksStart());
    },
    deleteMultipleTasksSuccess: ids => {
      dispatch(actions.deleteMultipleTasksSuccess(ids));
    },
    deleteMultipleTasksFail: () => {
      dispatch(actions.deleteMultipleTasksFail());
    },
    deleteTaskStart: () => {
      dispatch(actions.deleteTaskStart());
    },
    deleteTaskSuccess: taskId => {
      dispatch(actions.deleteTaskSuccess(taskId));
    },
    deleteTaskFail: () => {
      dispatch(actions.deleteTaskFail());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskTableContainer);
