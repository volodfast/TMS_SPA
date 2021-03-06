import React from "react";
import PropTypes from "prop-types";

import ErrorList from "../../../../../components/ErrorList/ErrorList";

import history from "../../../../../history/history";

import "./EditUserPage.css";

const EditUserPage = props => {
  let errors = null;
  if (props.errors && props.errors.length !== 0) {
    errors = <ErrorList errors={props.errors} />;
  }

  return (
    <div className="edit-user-container">
      <button onClick={history.goBack} className="btn btn-primary back-button">
        Back
      </button>
      <h1>Update your profile</h1>

      {errors}
      <div className="row">
        <form className="col-md-4 col-md-offset-4">
          <label htmlFor="user_first_name">First Name</label>
          <input
            type="text"
            name="user_first_name"
            id="user_first_name"
            className="form-control"
            defaultValue={props.user.first_name}
            onChange={props.handleFirstNameChange}
          />

          <label htmlFor="user_last_name">Last Name</label>
          <input
            type="text"
            name="user_last_name"
            id="user_last_name"
            className="form-control"
            defaultValue={props.user.last_name}
            onChange={props.handleLastNameChange}
          />

          <label htmlFor="user_email">Email</label>
          <input
            type="text"
            name="user_email"
            id="user_email"
            className="form-control"
            defaultValue={props.user.email}
            onChange={props.handleEmailChange}
          />

          <label htmlFor="user_password">Password</label>
          <input
            type="password"
            name="user_password"
            id="user_password"
            className="form-control"
            defaultValue={props.user.password}
            onChange={props.handlePasswordChange}
          />

          <label htmlFor="user_password_confirmation">Password</label>
          <input
            type="password"
            name="user_password_confirmation"
            id="user_password_confirmation"
            className="form-control"
            defaultValue={props.user.password_confirmation}
            onChange={props.handlePasswordConfirmationChange}
          />

          <input
            type="submit"
            className="btn btn-primary"
            value="Save changes"
            onClick={props.handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;

EditUserPage.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string
  }),
  errors: PropTypes.arrayOf(PropTypes.string),
  handleFirstNameChange: PropTypes.func,
  handleLastNameChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  handlePasswordConfirmationChange: PropTypes.func,
  handleSubmit: PropTypes.func
};
