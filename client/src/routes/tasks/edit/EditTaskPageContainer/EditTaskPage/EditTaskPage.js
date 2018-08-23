import React from "react";
import PropTypes from "prop-types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/en-gb";

import ErrorList from "../../../../../components/ErrorList/ErrorList";

import history from "../../../../../history/history";

import "./EditTaskPage.css";

const EditTaskPage = props => {
  let errors = null;
  if (props.errors && props.errors.length !== 0) {
    errors = <ErrorList errors={props.errors} />;
  }

  if (props.loading) {
    return <div className="edit-task-statusInfo">Loading task...</div>;
  }

  if (props.title.length === 0) {
    return <div className="edit-task-statusInfo">You have no such task!</div>;
  }

  return (
    <div className="edit-task-container">
      <button onClick={history.goBack} className="btn btn-primary back-button">
        Back
      </button>
      <h1>Edit Task</h1>

      {errors}
      <div className="row">
        <form className="col-md-4 col-md-offset-4 input-block">
          <label htmlFor="task_title">Title</label>
          <input
            type="text"
            name="task_title"
            id="task_title"
            className="form-control"
            defaultValue={props.title}
            onChange={props.handleTitleChange}
          />
          <label htmlFor="task_priority">Priority</label>
          <input
            type="number"
            step="1"
            min="0"
            max="10"
            name="task_priority"
            id="task_priority"
            className="form-control"
            defaultValue={props.priority}
            onChange={props.handlePriorityChange}
          />
          <label htmlFor="task_due_date">Due date</label>
          <div>
            <DatePicker
              inline
              locale="en-gb"
              className="form-control date-picker"
              selected={moment(props.due_date)}
              onChange={props.handleDueDateChange}
            />
          </div>

          <label htmlFor="task_description">Description</label>
          <textarea
            cols="24"
            rows="6"
            name="task_description"
            id="task_description"
            className="form-control"
            defaultValue={props.description}
            onChange={props.handleDescriptionChange}
          />
          <input
            type="submit"
            value="Edit task"
            className="btn btn-success"
            onClick={props.handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;

EditTaskPage.propTypes = {
  title: PropTypes.string,
  priority: PropTypes.number,
  due_date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  loading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func,
  handleTitleChange: PropTypes.func,
  handlePriorityChange: PropTypes.func,
  handleDueDateChange: PropTypes.func,
  handleDescriptionChange: PropTypes.func
};
