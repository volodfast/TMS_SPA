import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import LoginPage from "../../components/LoginPage/LoginPage";
import * as actions from "../../store/actions/actions";
import nav from "../../history/nav";

import "./LoginPageContainer.css";

class LoginPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: []
    };

    this.authenticate = this.authenticate.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  authenticate(e) {
    e.preventDefault();
    let errNum = 1;
    this.props.authStart();
    Axios.post("/api/user_token", {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res => {
        errNum = 2;
        this.setState({
          email: "",
          password: "",
          errors: []
        });
        const user = res.data.user;
        const token = res.data.jwt;

        this.props.authSuccess(user, token);

        this.props.loadAllTasksStart();
        return Axios.get(`/api/users/${user.id}/tasks`, {
          headers: {
            Authorization: token
          }
        });
      })
      .then(res => {
        const tasks = res.data;
        this.props.loadAllTasksSuccess(tasks);
        nav("/");
      })
      .catch(err => {
        let errText = "Something went wrong!";
        if (err.response.status === 401) {
          errText = "Invalid email/password combination!";
        }
        if (errNum === 1) {
          this.props.authFail(errText);
        } else if (errNum === 2) {
          this.props.loadAllTasksFail(errText);
        }
      });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
      <div>
        <LoginPage
          email={this.state.email}
          password={this.state.password}
          errors={this.state.errors}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          authenticate={this.authenticate}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
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
}

export default connect(
  null,
  mapDispatchToProps
)(LoginPageContainer);
