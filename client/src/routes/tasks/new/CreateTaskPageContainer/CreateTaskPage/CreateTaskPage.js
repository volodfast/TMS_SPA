import React from "react";
import PropTypes from "prop-types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/en-gb";

import ErrorList from "../../../../../components/ErrorList/ErrorList";

import history from "../../../../../history/history";

import "./CreateTaskPage.css";

const CreateTaskPage = props => {
  let errors = null;
  if (props.errors && props.errors.length !== 0) {
    errors = <ErrorList errors={props.errors} />;
  }

  return (
    <div className="create-task-container">
      <button onClick={history.goBack} className="btn btn-primary back-button">
        Back
      </button>
      <h1>Create New Task</h1>

      {errors}
      <div className="row">
        <form className="col-md-4 col-md-offset-4 input-block">
          <label htmlFor="task_title">Title</label>
          <input
            type="text"
            name="task_title"
            id="task_title"
            className="form-control"
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
            defaultValue="0"
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
            onChange={props.handleDescriptionChange}
          />
          <input
            type="submit"
            value="Create task"
            className="btn btn-primary"
            onClick={props.handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;

CreateTaskPage.propTypes = {
  due_date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleTitleChange: PropTypes.func,
  handlePriorityChange: PropTypes.func,
  handleDueDateChange: PropTypes.func,
  handleDescriptionChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string)
};
