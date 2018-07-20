import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import TaskTable from "../TaskTable/TaskTable";

import * as actions from "../../store/actions/actions";

class ActiveTaskTable extends Component {
  constructor(props) {
    super(props);

    this.completeSelected = this.completeSelected.bind(this);
  }

  completeSelected(ids) {
    if (ids.length === 0) return;

    const link = `/api/users/${this.props.userId}/tasks/change_active_multiple`;
    const active = false;
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
    return (
      <div className="tab-pane fade active in" id={this.props.id}>
        <TaskTable
          active
          tasks={this.props.tasks}
          text={{
            default: "There are no active tasks! Create new one!",
            active: "Number of active tasks:"
          }}
          handleSelected={this.completeSelected}
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
)(ActiveTaskTable);
