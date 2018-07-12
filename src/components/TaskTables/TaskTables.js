import React from "react";

import ActiveTaskTable from "../ActiveTaskTable/ActiveTaskTable";
import FinishedTaskTable from "../FinishedTaskTable/FinishedTaskTable";

export default props => {
    const activeId = "active_tasks_container";
    const finishedId = "finished_tasks_container";
    return (
        <div className="col-md-8">
            <ul className="nav nav-tabs">
                <li className="active">
                    <a data-toggle="tab" href={"#" + activeId}>
                        Active tasks
                    </a>
                </li>
                <li>
                    <a data-toggle="tab" href={"#" + finishedId}>
                        Finished tasks
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                <ActiveTaskTable id={activeId} tasks={props.activeTasks} />
                <FinishedTaskTable
                    id={finishedId}
                    tasks={props.finishedTasks}
                />
            </div>
        </div>
    );
};
