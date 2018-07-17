import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import CreateTaskPage from "./CreateTaskPage/CreateTaskPage";
import moment from "moment";

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
      console.log("not Valid");
      return;
    }
    console.log("Valid");
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

export default connect(mapStateToProps)(CreateTaskPageContainer);
