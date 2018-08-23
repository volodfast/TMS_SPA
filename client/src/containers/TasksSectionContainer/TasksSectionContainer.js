import React, { Component } from "react";
import { connect } from "react-redux";

import TasksSection from "./TasksSection/TasksSection";

import * as actions from "../../store/actions/actions";

class TaskSectionContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClickActive = this.handleClickActive.bind(this);
    this.handleClickFinished = this.handleClickFinished.bind(this);
  }

  handleClickActive(e) {
    this.props.changeTab("active");
  }

  handleClickFinished(e) {
    this.props.changeTab("finished");
  }

  render() {
    return (
      <TasksSection
        activeTasks={this.props.activeTasks}
        finishedTasks={this.props.finishedTasks}
        handleClickActive={this.handleClickActive}
        handleClickFinished={this.handleClickFinished}
        activeTab={this.props.activeTab}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTasks: state.tasks.active,
    finishedTasks: state.tasks.finished,
    activeTab: state.tasks.activeTab
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab: activeTab => {
      dispatch(actions.changeTasksActiveTab(activeTab));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSectionContainer);
