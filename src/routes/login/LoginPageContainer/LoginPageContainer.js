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

  componentDidUpdate() {
    if (this.props.authenticated) {
      nav("/");
    }
  }

  render() {
    return (
      <LoginPage
        authenticating={this.props.authenticating}
        email={this.state.email}
        password={this.state.password}
        errors={this.state.errors}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        authenticate={this.authenticate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    authenticating: state.auth.authenticating
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authStart: (email, password) => {
      dispatch(actions.authStart(email, password));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
