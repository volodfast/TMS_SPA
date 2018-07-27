import React from "react";
import PropTypes from "prop-types";

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

TaskTableControls.propTypes = {
  tasksNum: PropTypes.number,
  text: PropTypes.shape({
    default: PropTypes.string,
    active: PropTypes.string
  }),
  checkAll: PropTypes.func,
  uncheckAll: PropTypes.func,
  deleteSelected: PropTypes.func,
  button: PropTypes.object
};
