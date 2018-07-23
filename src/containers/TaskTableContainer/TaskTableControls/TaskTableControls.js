import React from "react";

import "./TaskTableControls.css";

const TaskTableControls = props => {
  let tableLable = "";
  if (props.text) {
    if (!props.tasksNum) {
      tableLable = props.text.default;
    } else {
      tableLable = `${props.text.active} ${props.tasksNum}`;
    }
  }

  return (
    <div className="task-table-controls">
      <h3>{tableLable}</h3>
      <div className="select_buttons">
        <button className="btn btn-default" onClick={props.checkAll}>
          Check all
        </button>
        <button className="btn btn-default" onClick={props.uncheckAll}>
          Uncheck all
        </button>
        {props.button}
        <button className="btn btn-danger" onClick={props.deleteSelected}>
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default TaskTableControls;
