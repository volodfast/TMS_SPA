import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TaskTableControls from "./TaskTableControls/TaskTableControls";
import TaskTable from "./TaskTable/TaskTable";

import * as actions from "../../store/actions/actions";

class TaskTableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIds: props.selectedIds || []
    };

    this.onToggleSelect = this.onToggleSelect.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.uncheckAll = this.uncheckAll.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleClickTitle = this.handleClickTitle.bind(this);
    this.handleClickPriority = this.handleClickPriority.bind(this);
    this.handleClickDueDate = this.handleClickDueDate.bind(this);
  }

  onToggleSelect(id) {
    if (this.state.selectedIds.includes(id)) {
      this.setState(state => {
        return {
          selectedIds: state.selectedIds.filter(taskId => {
            if (taskId === id) return false;
            return true;
          })
        };
      });
      return;
    }

    this.setState(state => {
      return {
        selectedIds: state.selectedIds.concat(id)
      };
    });
  }

  checkAll() {
    this.setState((state, props) => {
      const selectedIds = props.tasks.map(task => task.id);
      return {
        selectedIds
      };
    });
  }

  uncheckAll() {
    this.setState((state, props) => {
      return {
        selectedIds: []
      };
    });
  }

  deleteSelected(e) {
    e.preventDefault();
    const taskIds = this.state.selectedIds.concat();

    if (taskIds.length === 0) return;

    this.props.deleteMultipleTasksStart(taskIds);
  }

  deleteTask(id) {
    this.props.deleteTaskStart(id);
  }

  sort() {
    const sortedBy = this.props.sortBy;
    const sortedHow = this.props.sortHow;
    if (sortedBy === "priority") {
      return this.sortByPriority(sortedHow);
    }

    if (sortedBy === "title") {
      return this.sortByTitle(sortedHow);
    }

    if (sortedBy === "dueDate") {
      return this.sortByDueDate(sortedHow);
    }

    return this.props.tasks.concat();
  }

  sortByPriority(sortedHow) {
    let tasks = this.props.tasks.concat();
    tasks.sort((a, b) => {
      if (sortedHow === "desc") {
        return b.priority - a.priority;
      }
      if (sortedHow === "asc") {
        return a.priority - b.priority;
      }
      return 0;
    });
    return tasks;
  }

  sortByTitle(sortedHow) {
    let tasks = this.props.tasks.concat();
    tasks.sort((a, b) => {
      if (sortedHow === "asc") {
        return b.title.localeCompare(a.title);
      }
      if (sortedHow === "desc") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    return tasks;
  }

  sortByDueDate(sortedHow) {
    let tasks = this.props.tasks.concat();
    tasks.sort((a, b) => {
      const aDate = new Date(a.due_date).getTime();
      const bDate = new Date(b.due_date).getTime();
      if (sortedHow === "desc") {
        return bDate - aDate;
      }
      if (sortedHow === "asc") {
        return aDate - bDate;
      }
      return 0;
    });
    return tasks;
  }

  handleClickTitle() {
    let how = "desc";
    if (this.props.sortBy === "title") {
      if (this.props.sortHow === "desc") {
        how = "asc";
      }
    }
    this.props.changeSort({ by: "title", how });
  }

  handleClickPriority() {
    let how = "desc";
    if (this.props.sortBy === "priority") {
      if (this.props.sortHow === "desc") {
        how = "asc";
      }
    }
    this.props.changeSort({ by: "priority", how });
  }

  handleClickDueDate() {
    let how = "desc";
    if (this.props.sortBy === "dueDate") {
      if (this.props.sortHow === "desc") {
        how = "asc";
      }
    }
    this.props.changeSort({ by: "dueDate", how });
  }

  componentWillUnmount() {
    let ids = [];
    if (this.state.selectedIds.length !== 0) {
      const taskIds = this.props.tasks.map(task => task.id);
      ids = this.state.selectedIds.filter(id => {
        if (!taskIds.includes(id)) return false;
        return true;
      });
    }
    this.props.handleSelectedOnUnmount(ids);
  }

  render() {
    const tasksLength = this.props.tasks ? this.props.tasks.length : null;

    const options = this.props.handleSelected;

    let button = null;

    if (this.props.handleSelected) {
      button = (
        <button
          className={options.classes}
          onClick={() => {
            options.handler(this.state.selectedIds);
          }}
        >
          {options.text}
        </button>
      );
    }

    const tasks = this.sort();

    return (
      <div>
        <TaskTableControls
          tasksNum={tasksLength}
          text={this.props.text}
          checkAll={this.checkAll}
          uncheckAll={this.uncheckAll}
          deleteSelected={this.deleteSelected}
          button={button}
        />
        <TaskTable
          tasks={tasks}
          selectedTaskIds={this.state.selectedIds}
          onToggleSelect={this.onToggleSelect}
          deleteTask={this.deleteTask}
          clickTitle={this.handleClickTitle}
          clickPriority={this.handleClickPriority}
          clickDueDate={this.handleClickDueDate}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMultipleTasksStart: ids => {
      dispatch(actions.deleteMultipleTasksStart(ids));
    },
    deleteTaskStart: id => {
      dispatch(actions.deleteTaskStart(id));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(TaskTableContainer);

TaskTableContainer.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      priority: PropTypes.number,
      due_date: PropTypes.string,
      description: PropTypes.string
    })
  ),
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  handleSelectedOnUnmount: PropTypes.func,
  text: PropTypes.shape({
    default: PropTypes.string,
    active: PropTypes.string
  }),
  handleSelected: PropTypes.shape({
    text: PropTypes.string,
    classes: PropTypes.string,
    handler: PropTypes.func
  }),
  sortBy: PropTypes.string,
  sortedHow: PropTypes.string,
  changeSort: PropTypes.func
};
