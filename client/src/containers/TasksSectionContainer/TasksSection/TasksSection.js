import React from "react";
import PropTypes from "prop-types";

import ActiveTaskTable from "../../ActiveTaskTable/ActiveTaskTable";
import FinishedTaskTable from "../../FinishedTaskTable/FinishedTaskTable";

import "./TasksSection.css";

const TaskSection = props => {
  let activeTabStyle = "";
  if (props.activeTab === "active") {
    activeTabStyle = "active";
  }

  let finishedTabStyle = "";
  if (props.activeTab === "finished") {
    finishedTabStyle = "active";
  }

  let selectedTaskTable = null;
  if (props.activeTab === "active") {
    selectedTaskTable = <ActiveTaskTable tasks={props.activeTasks} />;
  }
  if (props.activeTab === "finished") {
    selectedTaskTable = <FinishedTaskTable tasks={props.finishedTasks} />;
  }

  return (
    <div className="task-tables col-md-8">
      <ul className="nav nav-tabs">
        <li className={activeTabStyle} onClick={props.handleClickActive}>
          <a>Active tasks</a>
        </li>
        <li className={finishedTabStyle} onClick={props.handleClickFinished}>
          <a>Finished tasks</a>
        </li>
      </ul>
      {selectedTaskTable}
    </div>
  );
};

export default TaskSection;

TaskSection.propTypes = {
  activeTasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      priority: PropTypes.number,
      due_date: PropTypes.string,
      description: PropTypes.string
    })
  ),
  finishedTasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      priority: PropTypes.number,
      due_date: PropTypes.string,
      description: PropTypes.string
    })
  ),
  handleClickActive: PropTypes.func,
  handleClickFinished: PropTypes.func,
  activeTab: PropTypes.string
};
