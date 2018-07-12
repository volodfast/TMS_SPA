import React, { Component } from "react";

import TaskTable from "../TaskTable/TaskTable";

export default class FinishedTaskTable extends Component {
    constructor(props) {
        super(props);

        this.uncompleteSelected = this.uncompleteSelected.bind(this);
    }

    uncompleteSelected(ids) {
        console.log("from finished:" + ids);
    }

    render() {
        return (
            <div className="tab-pane fade" id={this.props.id}>
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
