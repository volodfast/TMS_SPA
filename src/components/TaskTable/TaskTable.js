import React, { Component } from "react";

import Task from "./Task/Task";

import "./TaskTable.css";

export default class TaskTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIds: []
        };

        this.selectTask = this.selectTask.bind(this);
        this.unselectTask = this.unselectTask.bind(this);
        this.onToggleSelect = this.onToggleSelect.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.uncheckAll = this.uncheckAll.bind(this);
        this.onClickCompleteUncomplete = this.onClickCompleteUncomplete.bind(
            this
        );
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    selectTask(id) {
        this.setState(prevState => {
            return {
                selectedIds: [...prevState.selectedIds, id]
            };
        });
    }

    unselectTask(id) {
        this.setState(prevState => {
            const selectedIds = prevState.selectedIds.filter(sel_id => {
                if (sel_id === id) return false;
                return true;
            });
            return {
                selectedIds
            };
        });
    }

    onToggleSelect(id) {
        const selectedIds = this.state.selectedIds;
        for (let i = 0; i < selectedIds.length; i++) {
            if (selectedIds[i] === id) {
                this.unselectTask(id);
                return;
            }
        }
        this.selectTask(id);
    }

    isSelected(id) {
        const ids = this.state.selectedIds;
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] === id) return true;
        }
        return false;
    }

    checkAll() {
        const tasksIds = this.props.tasks.map(el => el.id);
        this.setState({
            selectedIds: tasksIds
        });
    }

    uncheckAll() {
        this.setState({
            selectedIds: []
        });
    }

    onClickCompleteUncomplete() {
        this.props.handleSelected(this.state.selectedIds);
    }

    onClickDelete() {
        console.log("From delete!");
    }

    render() {
        let tasks = null;
        if (this.props.tasks && this.props.tasks.length !== 0) {
            tasks = this.props.tasks.map(task => {
                return (
                    <Task
                        key={"task-" + task.id}
                        selected={this.isSelected(task.id)}
                        {...task}
                        onToggleSelect={this.onToggleSelect}
                    />
                );
            });
        }

        let tableLable = "";
        if (this.props.text) {
            if (tasks) {
                tableLable = this.props.text.active + " " + tasks.length;
            } else {
                tableLable = this.props.text.default;
            }
        }

        const button = this.props.active ? (
            <button
                className="btn btn-success"
                onClick={this.onClickCompleteUncomplete}
            >
                Complete
            </button>
        ) : (
            <button
                className="btn btn-warning"
                onClick={this.onClickCompleteUncomplete}
            >
                Uncomplete
            </button>
        );

        return (
            <div className="task-table">
                <h3>{tableLable}</h3>
                <div className="select_buttons">
                    <button className="btn btn-default" onClick={this.checkAll}>
                        Check all
                    </button>
                    <button
                        className="btn btn-default"
                        onClick={this.uncheckAll}
                    >
                        Uncheck all
                    </button>
                    {button}
                    <button
                        className="btn btn-danger"
                        onClick={this.onClickDelete}
                    >
                        Delete Selected
                    </button>
                </div>
                <table className="table-striped table-hover table-tasks">
                    <thead>
                        <tr className="table_head">
                            <th className="col-md-1 text-center checkbox_column" />
                            <th className="col-md-2 text-center title_column">
                                Title
                            </th>
                            <th className="col-md-2 text-center due_date_column">
                                Due Date
                            </th>
                            <th className="col-md-1 text-center priority_column">
                                Priority
                            </th>
                            <th className="col-md-1 text-center edit_task_column" />
                            <th className="col-md-1 text-center delete_task_column" />
                        </tr>
                    </thead>
                    <tbody>{tasks}</tbody>
                </table>
            </div>
        );
    }
}
