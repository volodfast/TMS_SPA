import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";
import Axios from "axios";

import CreateTaskPage from "./CreateTaskPage/CreateTaskPage";

import * as actions from "../../store/actions/actions";
import nav from "../../history/nav";

class CreateTaskPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      priority: 0,
      due_date: moment().valueOf(),
      description: "",
      errors: []
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.showState = this.showState.bind(this);
    this.validateBeforeSend = this.validateBeforeSend.bind(this);
  }

  showState() {
    console.dir(this.state);
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
    this.showState();
    if (!this.validateBeforeSend()) {
      return;
    }
    const token = localStorage.getItem("tms-jwt");
    const link = `/api/users/${this.props.userId}/tasks`;
    this.props.createTaskStart();
    Axios.post(
      link,
      {
        task: {
          title: this.state.title,
          priority: this.state.priority,
          due_date: new Date(this.state.due_date),
          description: this.state.description
        }
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
      .then(res => {
        this.props.createTaskSuccess(res.data);
        nav("/");
      })
      .catch(err => {
        this.props.createTaskFail();
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

  render() {
    return (
      <CreateTaskPage
        due_date={this.state.due_date}
        handleTitleChange={this.handleTitleChange}
        handlePriorityChange={this.handlePriorityChange}
        handleDueDateChange={this.handleDueDateChange}
        handleDescriptionChange={this.handleDescriptionChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
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
    createTaskStart: () => {
      dispatch(actions.createTaskStart());
    },
    createTaskSuccess: task => {
      dispatch(actions.createTaskSuccess(task));
    },
    createTaskFail: () => {
      dispatch(actions.createTaskFail());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTaskPageContainer);
