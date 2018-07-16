import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./containers/Navigation/Navigation";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";

import TasksContainer from "./components/TasksContainer/TasksContainer";
import MainPageContainer from "./containers/MainPageContainer/MainPageContainer";
import LoginPageContainer from "./containers/LoginPageContainer/LoginPageContainer";
import ShowTaskPageContainer from "./containers/ShowTaskPageContainer/ShowTaskPageContainer";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

import * as actions from "./store/actions/actions";

import "./App.css";
import Axios from "axios";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("tms-jwt");
    const userId = localStorage.getItem("tms-user-id");
    if (token && userId) {
      const baseUrl = `/api/users/${userId}`;

      let errType = 1;
      let errMsg = "Can't identify user by token!";
      this.props.authStart();
      Axios.get(baseUrl)
        .then(res => {
          errType = 2;
          errMsg = "Can't load user tasks!";
          this.props.authSuccess(res.data, token);

          this.props.loadAllTasksStart();

          return Axios.get(`${baseUrl}/tasks`, {
            headers: {
              Authorization: token
            }
          });
        })
        .then(res => {
          this.props.loadAllTasksSuccess(res.data);
        })
        .catch(err => {
          if (errType === 1) {
            this.props.authFail(errMsg);
          } else if (errType === 2) {
            this.props.loadAllTasksFail(errMsg);
          }
        });
    }
  }

  render() {
    const auth = this.props.authenticated;
    return (
      <div className="App container">
        <Navigation />
        <Switch>
          <ProtectedRoute
            path="/"
            authenticated={auth}
            exact
            component={MainPageContainer}
          />
          <ProtectedRoute
            path="/tasks"
            authenticated={auth}
            exact
            component={TasksContainer}
          />
          <ProtectedRoute
            path="/task/:task_id"
            authenticated="auth"
            exact
            component={ShowTaskPageContainer}
          />
          <Route path="/login" exact component={LoginPageContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authStart: () => {
      dispatch(actions.authStart());
    },
    authSuccess: (user, token) => {
      dispatch(actions.authSuccess(user, token));
    },
    authFail: errMsg => {
      dispatch(actions.authFail(errMsg));
    },
    loadAllTasksStart: () => {
      dispatch(actions.loadAllTasksStart());
    },
    loadAllTasksSuccess: tasks => {
      dispatch(actions.loadAllTasksSuccess(tasks));
    },
    loadAllTasksFail: errMsg => {
      dispatch(actions.loadAllTasksFail(errMsg));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
