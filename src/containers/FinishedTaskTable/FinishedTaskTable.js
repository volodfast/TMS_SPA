import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import TaskTableContainer from "../TaskTableContainer/TaskTableContainer";

import * as actions from "../../store/actions/actions";

class FinishedTaskTable extends Component {
  constructor(props) {
    super(props);

    this.uncompleteSelected = this.uncompleteSelected.bind(this);
    this.getSelectedFiltered = this.getSelectedFiltered.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  changeSort({ by, how }) {
    this.props.changeFinishedTableSort({ by, how });
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

  getSelectedFiltered() {
    const taskIds = this.props.tasks.map(task => task.id);
    const selectedIds = this.props.selectedFinished;

    return selectedIds.filter(sel_id => {
      if (taskIds.includes(sel_id)) return true;
      return false;
    });
  }

  render() {
    const handleSelected = {
      text: "Uncomplete",
      classes: "btn btn-warning",
      handler: this.uncompleteSelected
    };

    const selected = this.getSelectedFiltered();

    return (
      <TaskTableContainer
        selectedIds={selected}
        handleSelectedOnUnmount={this.props.addSelectedFinishedTaskIdsToCache}
        tasks={this.props.tasks}
        text={{
          default: "There are no finished tasks!",
          active: "Number of finished tasks:"
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
    selectedFinished: state.cache.selectedIds.finished,
    sortBy: state.tasks.finishedTableSort.by,
    sortHow: state.tasks.finishedTableSort.how
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
    addSelectedFinishedTaskIdsToCache: ids => {
      dispatch(actions.addSelectedFinishedTaskIdsToCache(ids));
    },
    changeFinishedTableSort: ({ by, how }) => {
      dispatch(actions.changeFinishedTableSort({ by, how }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishedTaskTable);
