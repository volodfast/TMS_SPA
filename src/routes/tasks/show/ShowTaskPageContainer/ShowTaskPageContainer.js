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
    const userId = this.props.userId;
    const taskId = +this.props.match.params.task_id;
    const link = `/api/users/${userId}/tasks/${taskId}`;
    this.props.deleteTaskStart();
    Axios.delete(link, {
      params: {
        id: taskId
      }
    })
      .then(res => {
        this.props.deleteTaskSuccess(taskId);
        nav("/");
      })
      .catch(err => {
        console.log("FAIL DELETE");
        console.dir(err);
        this.props.deleteTaskFail();
      });
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
)(ShowTaskPageContainer);
