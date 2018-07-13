import React from "react";
import { Link } from "react-router-dom";

import ErrorList from "../ErrorList/ErrorList";

import "./LoginPage.css";

export default props => {
  let errorsList = null;
  if (props.errors && props.errors.length !== 0) {
    errorsList = <ErrorList errors={props.errors} />;
  }
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4 login-page">
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
          />
          <label htmlFor="password">
            Password{" "}
            <span className="forgot-password">
              <Link to="/">(forgot password?)</Link>
            </span>
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
          <input
            className="btn btn-primary"
            type="submit"
            onClick={props.authenticate}
            defaultValue="Log In"
          />
        </form>
        <p>
          New user? <Link to="/">Sing up now!</Link>
        </p>
      </div>
    </div>
  );
};
