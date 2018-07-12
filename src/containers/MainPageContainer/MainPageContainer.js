import React, { Component } from "react";

import UserInfo from "../../components/UserInfo/UserInfo";
import TaskTablesContainer from "../TaskTablesContainer/TaskTablesContainer";

import "./MainPageContainer.css";

export default class MainPageContainer extends Component {
    render() {
        return (
            <div className="main-page-container row">
                <UserInfo
                    user={{ fullName: "vova test" }}
                    date={new Date().toDateString()}
                />
                <TaskTablesContainer />
            </div>
        );
    }
}
