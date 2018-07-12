import React, { Component } from "react";

import TaskTable from "../TaskTable/TaskTable";

export default class ActiveTaskTable extends Component {
    constructor(props) {
        super(props);

        this.completeSelected = this.completeSelected.bind(this);
    }

    completeSelected(ids) {
        console.log("from active:" + ids);
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
