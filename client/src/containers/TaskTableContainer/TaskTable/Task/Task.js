import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { formatTitle, formatDate } from "../../../../helpers/helpers";

import "./Task.css";

const Task = props => {
  const title = formatTitle(props.title, 25);
  const due_date = formatDate(props.due_date);

  return (
    <tr id={"task-" + props.id} className="task">
      <td className="active_checkbox">
        <input
          type="checkbox"
          name="active"
          id={"checkbox-" + props.id}
          checked={props.selected}
          onChange={() => {
            props.onToggleSelect(props.id);
          }}
        />
      </td>
      <td className="title">
        <Link to={"/tasks/" + props.id}>{title}</Link>
      </td>
      <td className="due_date">{due_date}</td>
      <td className="priority">{props.priority}</td>
      <td className="edit_task">
        <Link to={"/tasks/" + props.id + "/edit"} className="btn btn-warning">
          Edit
        </Link>
      </td>
      <td className="delete_task">
        <a className="btn btn-danger" onClick={props.handleDelete}>
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Task;

Task.propTypes = {
  title: PropTypes.string,
  priority: PropTypes.number,
  due_date: PropTypes.string,
  description: PropTypes.string,
  selected: PropTypes.bool,
  onToggleSelect: PropTypes.func,
  handleDelete: PropTypes.func
};
