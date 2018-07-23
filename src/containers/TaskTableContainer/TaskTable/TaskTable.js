import React from "react";
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
    <table className="table-striped table-hover table-tasks">
      <thead>
        <tr className="table_head">
          <th className="col-md-1 text-center checkbox_column" />
          <th className="col-md-2 text-center title_column">Title</th>
          <th className="col-md-2 text-center due_date_column">Due Date</th>
          <th className="col-md-1 text-center priority_column">Priority</th>
          <th className="col-md-1 text-center edit_task_column" />
          <th className="col-md-1 text-center delete_task_column" />
        </tr>
      </thead>
      <tbody>{tasks}</tbody>
    </table>
  );
};

export default TaskTable;
