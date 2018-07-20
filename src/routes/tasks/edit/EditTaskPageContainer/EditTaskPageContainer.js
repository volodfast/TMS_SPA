import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import Axios from "axios";

import EditTaskPage from "./EditTaskPage/EditTaskPage";

import * as actions from "../../../../store/actions/actions";
import nav from "../../../../history/nav";

class EditTaskPageContainer extends Component {
  constructor(props) {
    super(props);

    let task = this.findTaskById(+this.props.match.params.task_id);

    if (!task) {
      task = {
        title: "",
        priority: 0,
        due_date: moment(),
        description: ""
      };
    }

    this.state = {
      title: task.title,
      priority: task.priority,
      due_date: task.due_date,
      description: task.description,
      errors: []
    };

    this.findTaskById = this.findTaskById.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateBeforeSend = this.validateBeforeSend.bind(this);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handlePriorityChange(e) {
    this.setState({
      priority: +e.target.value
    });
  }

  handleDueDateChange(momentDate) {
    const date = momentDate ? momentDate.valueOf() : moment().valueOf();
    this.setState({
      due_date: date
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateBeforeSend()) {
      return;
    }
    const userId = this.props.userId;
    const taskId = this.props.match.params.task_id;

    const link = `/api/users/${userId}/tasks/${taskId}`;
    this.props.editTaskStart();
    Axios.put(link, {
      task: {
        title: this.state.title,
        priority: this.state.priority,
        due_date: new Date(this.state.due_date),
        description: this.state.description
      }
    })
      .then(res => {
        this.props.editTaskSuccess(res.data);
        nav("/");
      })
      .catch(err => {
        this.props.editTaskFail();
        console.log(err);
        this.setState({
          errors: ["Something went wrong!"]
        });
      });
  }

  validateBeforeSend() {
    const { title, priority, due_date } = this.state;
    let errors = [];
    if (title.trim().length === 0) {
      errors.push("Title can't be blank or whitespace");
    }
    if (title.length > 255) {
      errors.push("Title can't be longer than 255 chars");
    }
    if (priority < 0 || priority > 10) {
      errors.push("Priority can't be less than 0 or greater than 10");
    }
    if (due_date <= moment().valueOf()) {
      errors.push("Due date can't be in past");
    }
    this.setState({
      errors: errors
    });
    return errors.length === 0 ? true : false;
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
      return (
        <div style={{ fontSize: "24px", marginTop: "15px" }}>
          You have no such task!
        </div>
      );
    }
    return (
      <EditTaskPage
        {...task}
        errors={this.state.errors}
        handleSubmit={this.handleSubmit}
        handleTitleChange={this.handleTitleChange}
        handlePriorityChange={this.handlePriorityChange}
        handleDueDateChange={this.handleDueDateChange}
        handleDescriptionChange={this.handleDescriptionChange}
      />
    );
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
    editTaskStart: () => {
      dispatch(actions.editTaskStart());
    },
    editTaskSuccess: task => {
      dispatch(actions.editTaskSuccess(task));
    },
    editTaskFail: () => {
      dispatch(actions.editTaskFail());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTaskPageContainer);
