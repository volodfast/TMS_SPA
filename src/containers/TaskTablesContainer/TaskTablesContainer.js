import React, { Component } from "react";
import axios from "axios";

import TaskTables from "../../components/TaskTables/TaskTables";

export default class TaskTablesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {
                active: [],
                finsihed: []
            }
        };
    }

    componentDidMount() {
        //get tasks
        //filter active tasks
        //filter finished tasks
        axios
            .get("/api/users/1/tasks")
            .then(res => {
                const tasks = res.data;
                const activeTasks = tasks.filter(task => {
                    if (task.active) return true;
                    return false;
                });
                const finishedTasks = tasks.filter(task => {
                    if (task.active) return false;
                    return true;
                });
                this.setState({
                    tasks: {
                        active: activeTasks,
                        finished: finishedTasks
                    }
                });
            })
            .catch(err => {
                console.dir(err);
            });
    }

    render() {
        return (
            <div>
                <TaskTables
                    activeTasks={this.state.tasks.active}
                    finishedTasks={this.state.tasks.finished}
                />
            </div>
        );
    }
}
