import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import TaskTable from "../TaskTable/TaskTable";

import * as actions from "../../../store/actions/actions";

class FinishedTaskTable extends Component {
  constructor(props) {
    super(props);

    this.uncompleteSelected = this.uncompleteSelected.bind(this);
  }

  uncompleteSelected(ids) {
    if (ids.length === 0) return;

    const link = `/api/users/${this.props.userId}/tasks/change_active_multiple`;
    const active = true;
    this.props.updateActiveMultipleTasksStart();
    Axios.put(link, { ids: ids, active: active })
      .then(res => {
        this.props.updateActiveMultipleTasksSuccess(res.data.ids, active);
      })
      .catch(err => {
        console.dir(err);
        this.props.updateActiveMultipleTasksFail();
      });
  }

  render() {
    const classStyle = this.props.isActive
      ? "tab-pane fade active in"
      : "tab-pane fade";
    return (
      <div className={classStyle} id={this.props.id}>
        <TaskTable
          tasks={this.props.tasks}
          text={{
            default: "There are no finished tasks!",
            active: "Number of finished tasks:"
          }}
          handleSelected={this.uncompleteSelected}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateActiveMultipleTasksStart: () => {
      dispatch(actions.updateActiveMultipleTasksStart());
    },
    updateActiveMultipleTasksSuccess: (task_ids, active) => {
      dispatch(actions.updateActiveMultipleTasksSuccess(task_ids, active));
    },
    updateActiveMultipleTasksFail: () => {
      dispatch(actions.updateActiveMultipleTasksFail());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishedTaskTable);
