import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

import Navigation from "./containers/Navigation/Navigation";
import ProtectedRoute from "./containers/ProtectedRoute/ProtectedRoute";

import MainPageContainer from "./routes/root/MainPageContainer/MainPageContainer";
import LoginPageContainer from "./routes/login/LoginPageContainer/LoginPageContainer";
import ShowTaskPageContainer from "./routes/tasks/show/ShowTaskPageContainer/ShowTaskPageContainer";
import CreateTaskPageContainer from "./routes/tasks/new/CreateTaskPageContainer/CreateTaskPageContainer";
import EditTaskPageContainer from "./routes/tasks/edit/EditTaskPageContainer/EditTaskPageContainer";
import EditUserPageContainer from "./routes/user/edit/EditUserPageContainer/EditUserPageContainer";
import CreateUserPageContainer from "./routes/signup/CreateUserPageContainer/CreateUserPageContainer";
import NotFoundPage from "./routes/404/NotFoundPage/NotFoundPage";

import * as actions from "./store/actions/actions";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("tms-jwt");
    const userId = localStorage.getItem("tms-user-id");
    if (token && userId) {
      const baseUrl = `/api/users/${userId}`;

      let errType = 1;
      let errMsg = "Can't identify user by token!";
      this.props.authStart();

      Axios.get(baseUrl, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(res => {
          errType = 2;
          errMsg = "Can't load user tasks!";
          this.props.authSuccess(res.data, token);

          Axios.defaults.headers["Authorization"] = "Bearer " + token;

          this.props.loadAllTasksStart();
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

  componentDidMount() {}

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
            path="/tasks/new"
            authenticated={auth}
            exact
            component={CreateTaskPageContainer}
          />
          <ProtectedRoute
            path="/tasks/:task_id"
            authenticated={auth}
            exact
            component={ShowTaskPageContainer}
          />
          <ProtectedRoute
            path="/tasks/:task_id/edit"
            authenticated={auth}
            exact
            component={EditTaskPageContainer}
          />
          <ProtectedRoute
            path="/user/edit"
            authenticated={auth}
            exact
            component={EditUserPageContainer}
          />
          <Route path="/login" exact component={LoginPageContainer} />
          <Route path="/signup" exect component={CreateUserPageContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    authenticating: state.auth.authenticating
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
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
