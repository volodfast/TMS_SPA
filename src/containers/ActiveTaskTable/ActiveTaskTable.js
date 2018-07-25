import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import TaskTableContainer from "../TaskTableContainer/TaskTableContainer";

import * as actions from "../../store/actions/actions";

class ActiveTaskTable extends Component {
  constructor(props) {
    super(props);

    this.completeSelected = this.completeSelected.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  changeSort({ by, how }) {
    this.props.changeActiveTableSort({ by, how });
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
    const handleSelected = {
      text: "Complete",
      classes: "btn btn-success",
      handler: this.completeSelected
    };

    return (
      <TaskTableContainer
        selectedIds={this.props.selectedActive}
        handleSelectedOnUnmount={this.props.addSelectedActiveTaskIdsToCache}
        tasks={this.props.tasks}
        text={{
          default: "There are no active tasks! Create new one!",
          active: "Number of active tasks:"
        }}
        handleSelected={handleSelected}
        sortBy={this.props.sortBy}
        sortHow={this.props.sortHow}
        changeSort={this.changeSort}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    selectedActive: state.cache.selectedIds.active,
    sortBy: state.tasks.activeTableSort.by,
    sortHow: state.tasks.activeTableSort.how
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
    },
    changeActiveTableSort: ({ by, how }) => {
      dispatch(actions.changeActiveTableSort({ by, how }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTaskTable);
