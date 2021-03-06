import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ErrorList from "../../../../components/ErrorList/ErrorList";

import "./LoginPage.css";

const LoginPage = props => {
  let errorsList = null;
  if (props.errors && props.errors.length !== 0) {
    errorsList = <ErrorList errors={props.errors} />;
  }

  let loading = null;

  if (props.authenticating) {
    loading = <div style={{ fontSize: 48 }}>Loading...</div>;
  }
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4 login-page">
        {loading}
        <h1>Log In</h1>
        {errorsList}
        <form>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            type="text"
            value={props.email}
            onChange={props.handleEmailChange}
            tabIndex="1"
          />
          <label htmlFor="password">
            Password{" "}
            <span className="forgot-password">
              <Link to="/" tabIndex="4">
                (forgot password?)
              </Link>
            </span>
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
            tabIndex="2"
          />
          <input
            className="btn btn-primary"
            type="submit"
            onClick={props.authenticate}
            defaultValue="Log In"
            tabIndex="3"
          />
        </form>
        <p>
          New user?{" "}
          <Link to="/signup" tabIndex="5">
            Sing up now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.propTypes = {
  authenticating: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  authenticate: PropTypes.func
};
