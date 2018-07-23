import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";

import { formatDate, formatTitle } from "../../../helpers/helpers";

import * as actions from "../../../store/actions/actions";
import "./Task.css";

const Task = props => {
  function handleDelete(e) {
    e.preventDefault();

    const userId = props.userId;
    const taskId = props.id;
    const link = `/api/users/${userId}/tasks/${taskId}`;

    props.deleteTaskStart();
    Axios.delete(link, {
      params: {
        id: taskId
      }
    })
      .then(res => {
        props.deleteTaskSuccess(taskId);
      })
      .catch(err => {
        console.log("FAIL DELETE");
        console.dir(err);
        props.deleteTaskFail();
      });
  }

  const due_date = formatDate(props.due_date);
  const title = formatTitle(props.title, 15);

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
        <a className="btn btn-danger" onClick={handleDelete}>
          Delete
        </a>
      </td>
    </tr>
  );
};

function mapStateToProps(state) {
  return {
    userId: state.user.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTaskStart: () => {
      dispatch(actions.deleteTaskStart());
    },
    deleteTaskSuccess: taskId => {
      dispatch(actions.deleteTaskSuccess(taskId));
    },
    deleteTaskFail: () => {
      dispatch(actions.deleteTaskFail());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
