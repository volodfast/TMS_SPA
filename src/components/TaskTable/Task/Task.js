import React from "react";

import { formatDate, formatTitle } from "../../../helpers/helpers";

import "./Task.css";

export default props => {
  const link = "#";
  const due_date = formatDate(props.due_date);
  const title = formatTitle(props.title);
  return (
    <tr id={"task-" + props.id} className="task">
      <td className="active_checkbox">
        <input
          type="checkbox"
          name="active"
          id={"checkbox-" + props.id}
          checked={props.selected}
          onClick={() => {
            props.onToggleSelect(props.id);
          }}
        />
      </td>
      <td className="title">
        <a href={link}>{title}</a>
      </td>
      <td className="due_date">{due_date}</td>
      <td className="priority">{props.priority}</td>
      <td className="edit_task">
        <form action={link + "/edit"} method="GET">
          <input
            className="btn btn-warning buttons"
            type="submit"
            value="Edit"
          />
        </form>
      </td>
      <td className="delete_task">
        <input
          className="btn btn-danger buttons"
          type="submit"
          value="Delete"
          onClick={() => {}}
        />
      </td>
    </tr>
  );
};
