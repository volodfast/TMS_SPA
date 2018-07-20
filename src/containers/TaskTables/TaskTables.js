import React from "react";

import ActiveTaskTable from "./ActiveTaskTable/ActiveTaskTable";
import FinishedTaskTable from "./FinishedTaskTable/FinishedTaskTable";

const TaskTables = props => {
  const activeId = "active_tasks_container";
  const finishedId = "finished_tasks_container";

  let activeTabStyle = "";
  let activeIsActive = false;
  if (props.activeTab === "active") {
    activeTabStyle = "active";
    activeIsActive = true;
  }

  let finishedTabStyle = "";
  let finishedIsActive = false;
  if (props.activeTab === "finished") {
    finishedTabStyle = "active";
    finishedIsActive = true;
  }

  return (
    <div className="col-md-8">
      <ul className="nav nav-tabs">
        <li className={activeTabStyle} onClick={props.handleClickActive}>
          <a data-toggle="tab" href={"#" + activeId}>
            Active tasks
          </a>
        </li>
        <li className={finishedTabStyle} onClick={props.handleClickFinished}>
          <a data-toggle="tab" href={"#" + finishedId}>
            Finished tasks
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <ActiveTaskTable
          id={activeId}
          tasks={props.activeTasks}
          isActive={activeIsActive}
        />
        <FinishedTaskTable
          id={finishedId}
          tasks={props.finishedTasks}
          isActive={finishedIsActive}
        />
      </div>
    </div>
  );
};

export default TaskTables;
