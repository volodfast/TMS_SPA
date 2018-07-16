import React, { Component } from "react";
import { connect } from "react-redux";

import ShowTaskPage from "../../components/ShowTaskPage/ShowTaskPage";

class ShowTaskPageContainer extends Component {
  constructor(props) {
    super(props);

    this.findTaskById = this.findTaskById.bind(this);
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

  render() {
    const id = +this.props.match.params.task_id;
    const task = this.findTaskById(id);

    if (task === null) {
      return <div>You have no such task!</div>;
    }
    return <ShowTaskPage {...task} />;
  }
}

function mapStateToProps(state) {
  return {
    activeTasks: state.tasks.active,
    finishedTasks: state.tasks.finished
  };
}

export default connect(mapStateToProps)(ShowTaskPageContainer);
