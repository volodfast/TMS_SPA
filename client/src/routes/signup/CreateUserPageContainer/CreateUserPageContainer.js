import React, { Component } from "react";
import { connect } from "react-redux";

import CreateUserPage from "./CreateUserPage/CreateUserPage";

import * as actions from "../../../store/actions/actions";

class CreateUserPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: []
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(e) {
    e.persist();
    this.setState(state => {
      return {
        first_name: e.target.value
      };
    });
  }

  handleLastNameChange(e) {
    e.persist();

    this.setState(state => {
      return {
        last_name: e.target.value
      };
    });
  }

  handleEmailChange(e) {
    e.persist();

    this.setState(state => {
      return {
        email: e.target.value
      };
    });
  }

  handlePasswordChange(e) {
    e.persist();

    this.setState(state => {
      return {
        password: e.target.value
      };
    });
  }

  handlePasswordConfirmationChange(e) {
    e.persist();

    this.setState(state => {
      return {
        password_confirmation: e.target.value
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateBeforeSend()) {
      return;
    }

    const user = {
      first_name: this.state.first_name.trim(),
      last_name: this.state.last_name.trim(),
      email: this.state.email.trim(),
      password: this.state.password.trim(),
      password_confirmation: this.state.password_confirmation.trim()
    };

    this.props.createUserStart(user);
  }

  validateBeforeSend() {
    const firstName = this.state.first_name.trim();
    const lastName = this.state.last_name.trim();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const passwordConfirmation = this.state.password_confirmation.trim();

    let errors = [];
    if (firstName.length === 0 || firstName.length > 50) {
      errors.push("First Name can't be blank or longer then 50 chars!");
    }
    if (lastName.length === 0 || lastName.length > 50) {
      errors.push("Last Name can't be blank or longer then 50 chars!");
    }
    if (email.length === 0 || email.length > 255) {
      errors.push("Email can't be blank or longer than 255 chars!");
    }
    const regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!regEx.test(email)) {
      errors.push("Email is not valid!");
    }

    if (password !== passwordConfirmation) {
      errors.push("Password and password confirmation should be equal!");
    }
    if (password.length < 6) {
      errors.push("Password can't be less than 6 chars!");
    }

    if (errors.length !== 0) {
      this.setState(state => {
        return {
          errors: errors
        };
      });
    }

    return errors.length === 0 ? true : false;
  }

  render() {
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    return (
      <CreateUserPage
        user={user}
        errors={this.state.errors}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handlePasswordConfirmationChange={this.handlePasswordConfirmationChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUserStart: user => {
      dispatch(actions.createUserStart(user));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CreateUserPageContainer);
