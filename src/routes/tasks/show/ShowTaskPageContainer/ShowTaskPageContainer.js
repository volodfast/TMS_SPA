import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import ShowTaskPage from "./ShowTaskPage/ShowTaskPage";

import * as actions from "../../../../store/actions/actions";
import nav from "../../../../history/nav";

class ShowTaskPageContainer extends Component {
  constructor(props) {
    super(props);

    this.findTaskById = this.findTaskById.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  findTaskById(id) {
    const tasks = this.props.activeTasks.concat(this.props.finishedTasks);
    let task = null;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        task = tasks[i];
        break;
      }
    }

    return task;
  }

  handleDelete(e) {
    e.preventDefault();
    const taskId = +this.props.match.params.task_id;
    this.props.deleteTaskStart(taskId);
  }

  render() {
    const id = +this.props.match.params.task_id;
    const task = this.findTaskById(id);

    if (task === null) {
      return (
        <div style={{ fontSize: "24px", marginTop: "15px" }}>
          You have no such task!
        </div>
      );
    }
    return <ShowTaskPage {...task} handleDelete={this.handleDelete} />;
  }
}

function mapStateToProps(state) {
  return {
    activeTasks: state.tasks.active,
    finishedTasks: state.tasks.finished,
    userId: state.user.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTaskStart: id => {
      dispatch(actions.deleteTaskStart(id));
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
)(ShowTaskPageContainer);
