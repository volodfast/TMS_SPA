import React, { Component } from "react";
import { connect } from "react-redux";

import LoginPage from "./LoginPage/LoginPage";
import * as actions from "../../../store/actions/actions";

import nav from "../../../history/nav";

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
    const { email, password } = this.state;

    this.props.authStart(email, password);
    nav("/");
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
    authStart: (email, password) => {
      dispatch(actions.authStart(email, password));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(LoginPageContainer);
