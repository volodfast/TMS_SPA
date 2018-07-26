import React, { Component } from "react";
import { connect } from "react-redux";

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

    const active = false;
    this.props.updateActiveMultipleTasksStart(ids, active);
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
    selectedActive: state.cache.selectedIds.active,
    sortBy: state.tasks.activeTableSort.by,
    sortHow: state.tasks.activeTableSort.how
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateActiveMultipleTasksStart: (ids, active) => {
      dispatch(actions.updateActiveMultipleTasksStart(ids, active));
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
