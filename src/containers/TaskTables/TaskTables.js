import React, { Component } from "react";
import { connect } from "react-redux";

import ActiveTaskTable from "./ActiveTaskTable/ActiveTaskTable";
import FinishedTaskTable from "./FinishedTaskTable/FinishedTaskTable";

import * as actions from "../../store/actions/actions";

class TaskTables extends Component {
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
    const activeId = "active_tasks_container";
    const finishedId = "finished_tasks_container";

    let activeTabStyle = "";
    let activeIsActive = false;
    if (this.props.activeTab === "active") {
      activeTabStyle = "active";
      activeIsActive = true;
    }

    let finishedTabStyle = "";
    let finishedIsActive = false;
    if (this.props.activeTab === "finished") {
      finishedTabStyle = "active";
      finishedIsActive = true;
    }

    return (
      <div className="col-md-8">
        <ul className="nav nav-tabs">
          <li className={activeTabStyle} onClick={this.handleClickActive}>
            <a data-toggle="tab" href={"#" + activeId}>
              Active tasks
            </a>
          </li>
          <li className={finishedTabStyle} onClick={this.handleClickFinished}>
            <a data-toggle="tab" href={"#" + finishedId}>
              Finished tasks
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <ActiveTaskTable
            id={activeId}
            tasks={this.props.activeTasks}
            isActive={activeIsActive}
          />
          <FinishedTaskTable
            id={finishedId}
            tasks={this.props.finishedTasks}
            isActive={finishedIsActive}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
)(TaskTables);
