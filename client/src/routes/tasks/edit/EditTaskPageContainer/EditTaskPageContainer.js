import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import EditTaskPage from "./EditTaskPage/EditTaskPage";

import * as actions from "../../../../store/actions/actions";

class EditTaskPageContainer extends Component {
  constructor(props) {
    super(props);

    let task = this.findTaskById(+this.props.match.params.task_id);

    if (!task) {
      task = {
        title: "",
        priority: 0,
        due_date: moment().valueOf(),
        description: ""
      };
    }

    this.state = {
      title: task.title,
      priority: task.priority,
      due_date: task.due_date,
      description: task.description
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
    e.persist();

    this.setState(state => {
      return {
        title: e.target.value
      };
    });
  }

  handlePriorityChange(e) {
    e.persist();

    this.setState(state => {
      return {
        priority: +e.target.value
      };
    });
  }

  handleDueDateChange(momentDate) {
    const date = momentDate ? momentDate.valueOf() : moment().valueOf();
    this.setState(state => {
      return {
        due_date: date
      };
    });
  }

  handleDescriptionChange(e) {
    e.persist();

    this.setState(state => {
      return {
        description: e.target.value
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateBeforeSend()) {
      return;
    }
    const task = {
      title: this.state.title,
      priority: this.state.priority,
      due_date: new Date(this.state.due_date),
      description: this.state.description
    };

    const taskId = this.props.match.params.task_id;

    this.props.editTaskStart(task, taskId);
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
    this.setState(state => {
      return {
        errors: errors
      };
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

  static getDerivedStateFromProps(props, prevState) {
    if (props.loaded) {
      const taskId = +props.match.params.task_id;
      const task = props.activeTasks
        .concat(props.finishedTasks)
        .reduce((a, b) => {
          if (b.id === taskId) return b;
          return a;
        }, null);

      if (task) {
        return {
          title: task.title,
          priority: task.priority,
          due_date: task.due_date,
          description: task.description,
          empty: false
        };
      }
    }
    return null;
  }

  render() {
    return (
      <EditTaskPage
        {...this.state}
        loading={this.props.loading}
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
    loading: state.tasks.load.loading,
    loaded: state.tasks.load.loaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editTaskStart: (task, taskId) => {
      dispatch(actions.editTaskStart(task, taskId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTaskPageContainer);
