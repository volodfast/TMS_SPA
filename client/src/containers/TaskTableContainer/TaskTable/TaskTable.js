import React from "react";
import PropTypes from "prop-types";

import Task from "./Task/Task";

import "./TaskTable.css";

const TaskTable = props => {
  const selectedIds = props.selectedTaskIds;

  let tasks = props.tasks.map(task => {
    const checked = selectedIds.includes(task.id);
    return (
      <Task
        key={task.id}
        {...task}
        selected={checked}
        onToggleSelect={props.onToggleSelect}
        handleDelete={e => {
          e.preventDefault();
          props.deleteTask(task.id);
        }}
      />
    );
  });

  return (
    <table className="table-striped table-hover task-table">
      <thead>
        <tr className="table_head">
          <th className="col-md-1 text-center checkbox_column" />
          <th
            className="col-md-2 text-center title_column sorting-label"
            onClick={props.clickTitle}
          >
            Title
          </th>
          <th
            className="col-md-2 text-center due_date_column sorting-label"
            onClick={props.clickDueDate}
          >
            Due Date
          </th>
          <th
            className="col-md-1 text-center priority_column sorting-label"
            onClick={props.clickPriority}
          >
            Priority
          </th>
          <th className="col-md-1 text-center edit_task_column" />
          <th className="col-md-1 text-center delete_task_column" />
        </tr>
      </thead>
      <tbody>{tasks}</tbody>
    </table>
  );
};

export default TaskTable;

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      priority: PropTypes.number,
      due_date: PropTypes.string,
      description: PropTypes.string
    })
  ),
  selectedTaskIds: PropTypes.arrayOf(PropTypes.number),
  onToggleSelect: PropTypes.func,
  deleteTask: PropTypes.func,
  clickTitle: PropTypes.func,
  clickPriority: PropTypes.func,
  clickDueDate: PropTypes.func
};
