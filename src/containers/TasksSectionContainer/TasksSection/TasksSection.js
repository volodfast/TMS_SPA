import React from "react";

import ActiveTaskTable from "../../ActiveTaskTable/ActiveTaskTable";
import FinishedTaskTable from "../../FinishedTaskTable/FinishedTaskTable";

import "./TasksSection.css";

const TaskTables = props => {
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

export default TaskTables;
