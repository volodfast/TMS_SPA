import React from "react";

import "./Task.css";

export default props => {
    const link = "#";
    const due_date = getFormatedDate(props.due_date);
    const title = getFormatedTitle(props.title);
    return (
        <tr id={"task-" + props.id} className="task">
            <td className="active_checkbox">
                <input
                    type="checkbox"
                    name="active"
                    id={"checkbox-" + props.id}
                    checked={props.selected}
                    onClick={() => {
                        props.onToggleSelect(props.id);
                    }}
                />
            </td>
            <td className="title">
                <a href={link}>{title}</a>
            </td>
            <td className="due_date">{due_date}</td>
            <td className="priority">{props.priority}</td>
            <td className="edit_task">
                <form action={link + "/edit"} method="GET">
                    <input
                        className="btn btn-warning buttons"
                        type="submit"
                        value="Edit"
                    />
                </form>
            </td>
            <td className="delete_task">
                <input
                    className="btn btn-danger buttons"
                    type="submit"
                    value="Delete"
                    onClick={() => {}}
                />
            </td>
        </tr>
    );
};

function getFormatedDate(due_date) {
    const dueDate = new Date(due_date);
    const year = dueDate.getFullYear();
    let month = dueDate.getMonth() + 1;
    let day = dueDate.getDate();

    if (month.toString().length === 1) {
        month = "0" + month;
    }

    if (day.toString().length === 1) {
        day = "0" + day;
    }
    return `${year}-${month}-${day}`;
}

function getFormatedTitle(title) {
    if (title.length <= 24) return title;
    return title.slice(0, 21) + "...";
}
