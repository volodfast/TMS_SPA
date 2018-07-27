import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskTableContainer from "../TaskTableContainer/TaskTableContainer";

import * as actions from "../../store/actions/actions";

class FinishedTaskTable extends Component {
  constructor(props) {
    super(props);

    this.uncompleteSelected = this.uncompleteSelected.bind(this);
    this.changeSort = this.changeSort.bind(this);
  }

  changeSort({ by, how }) {
    this.props.changeFinishedTableSort({ by, how });
  }

  uncompleteSelected(ids) {
    if (ids.length === 0) return;

    const active = true;
    this.props.updateActiveMultipleTasksStart(ids, active);
  }

  render() {
    const handleSelected = {
      text: "Uncomplete",
      classes: "btn btn-warning",
      handler: this.uncompleteSelected
    };

    return (
      <TaskTableContainer
        tasks={this.props.tasks}
        selectedIds={this.props.selectedFinished}
        handleSelectedOnUnmount={this.props.addSelectedFinishedTaskIdsToCache}
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
    selectedFinished: state.cache.selectedIds.finished,
    sortBy: state.tasks.finishedTableSort.by,
    sortHow: state.tasks.finishedTableSort.how
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateActiveMultipleTasksStart: (ids, active) => {
      dispatch(actions.updateActiveMultipleTasksStart(ids, active));
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

FinishedTaskTable.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      priority: PropTypes.number,
      due_date: PropTypes.string,
      description: PropTypes.string
    })
  )
};
