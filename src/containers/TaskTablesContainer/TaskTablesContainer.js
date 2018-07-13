import React from "react";
import { connect } from "react-redux";

import TaskTables from "../../components/TaskTables/TaskTables";

const TaskTablesContainer = props => {
  return (
    <div>
      <TaskTables
        activeTasks={props.activeTasks}
        finishedTasks={props.finishedTasks}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeTasks: state.tasks.active,
    finishedTasks: state.tasks.finished
  };
}

export default connect(mapStateToProps)(TaskTablesContainer);
