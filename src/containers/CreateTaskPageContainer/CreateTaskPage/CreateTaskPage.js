import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "moment/locale/en-gb";

import ErrorList from "../../../components/ErrorList/ErrorList";

import "./CreateTaskPage.css";

const CreateTaskPage = props => {
  let errors = null;
  if (props.errors && props.errors.length !== 0) {
    errors = <ErrorList errors={props.errors} />;
  }

  return (
    <div className="create-task-container">
      <h1>Create New Task</h1>

      {errors}
      <div className="row">
        <div className="col-md-4 col-md-offset-4 input-block">
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
            type="button"
            value="Create task"
            className="btn btn-primary"
            onClick={props.handleSubmit}
          />

          {/* <%= form_for(@task, url: user_tasks_path(@user.id)) do |f| %>
        <%= render 'shared/task_error_messages' %>
        <ul class="errors_js"></ul>
        <%= f.label :title %>
        <%= f.text_field :title, class: 'form-control' %>
  
        <%= f.label :priority %>
        <%= f.number_field :priority, in: 0..10, step: 1, class: 'form-control' %>
        
        <%= f.label :due_date %>
        <%= f.text_field :due_date, class: 'datepicker form-control' %>
  
        <%= f.label :description %>
        <%= f.text_area :description, size: "24x6", class: 'form-control' %>
  
  
        <%= f.submit "Create task", class: "btn btn-primary", data: {disable_with: false} %>
      <% end %> */}
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
