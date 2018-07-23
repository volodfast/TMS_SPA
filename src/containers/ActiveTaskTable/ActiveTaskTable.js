import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import TaskTableContainer from "../TaskTableContainer/TaskTableContainer";

import * as actions from "../../store/actions/actions";

class ActiveTaskTable extends Component {
  constructor(props) {
    super(props);

    this.completeSelected = this.completeSelected.bind(this);
    this.getSelectedFiltered = this.getSelectedFiltered.bind(this);
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

  getSelectedFiltered() {
    const taskIds = this.props.tasks.map(task => task.id);
    const selectedIds = this.props.selectedActive;

    return selectedIds.filter(sel_id => {
      if (taskIds.includes(sel_id)) return true;
      return false;
    });
  }

  render() {
    const handleSelected = {
      text: "Complete",
      classes: "btn btn-success",
      handler: this.completeSelected
    };

    const selected = this.getSelectedFiltered();

    return (
      <TaskTableContainer
        selectedIds={selected}
        handleSelectedOnUnmount={this.props.addSelectedActiveTaskIdsToCache}
        tasks={this.props.tasks}
        text={{
          default: "There are no active tasks! Create new one!",
          active: "Number of active tasks:"
        }}
        handleSelected={handleSelected}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    selectedActive: state.cache.selectedIds.active
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
    },
    addSelectedActiveTaskIdsToCache: ids => {
      dispatch(actions.addSelectedActiveTaskIdsToCache(ids));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTaskTable);
