import React, { Component } from "react";
import { Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import TasksContainer from "./components/TasksContainer/TasksContainer";
import MainPageContainer from "./containers/MainPageContainer/MainPageContainer";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App container">
                <Navigation />
                <Route path="/" exact component={MainPageContainer} />
                <Route path="/tasks" exact component={TasksContainer} />
            </div>
        );
    }
}

export default App;
