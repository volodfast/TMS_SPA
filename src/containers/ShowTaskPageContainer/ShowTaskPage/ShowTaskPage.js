import React from "react";
import { Link } from "react-router-dom";

import { formatDate } from "../../../helpers/helpers";

import "./ShowTaskPage.css";

const ShowTaskPage = props => {
  const title = props.title;
  const dueDate = formatDate(props.due_date);
  const updatedAtDate = formatDate(props.updated_at);
  const priority = props.priority;
  const active = props.active ? "Yes" : "No";
  const description = props.description;

  console.dir(props);
  return (
    <div>
      <div className="task_show_block">
        <div className="row info_row">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 title_lable">
              <strong>Title</strong>: {title}
            </div>
            <div className="col-md-3 updated_lable">
              <strong>Updated</strong>: {updatedAtDate}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-md-offset-2">
              <strong>Due date</strong>: {dueDate}
            </div>

            <div className="col-md-2">
              <strong>Priority</strong>: {priority}
            </div>
            <div className="col-md-2">
              <strong>Active</strong>: {active}
            </div>
          </div>
        </div>
        <div className="row description_row">
          <div className="col-md-8 col-md-offset-2">
            <strong>Description</strong>: {description}
          </div>
        </div>
      </div>
      <div className="row edit_button_row">
        <div className="col-md-2 col-md-offset-3">
          <Link to="/" className="btn btn-primary">
            Back to tasks
          </Link>
        </div>

        <div className="col-md-2">
          <button className="btn btn-warning">Edit Task</button>
        </div>

        <div className="col-md-2">
          <button className="btn btn-danger" onClick={props.handleDelete}>
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTaskPage;
