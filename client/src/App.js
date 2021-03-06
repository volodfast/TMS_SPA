import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

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

    this.props.authStart();
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
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
