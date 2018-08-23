import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const WaitToLoginPage = props => {
  if (props.authenticating) {
    return <div>Wait to check if you are logged in...</div>;
  }
  if (props.authenticated) {
    return <Redirect to={props.path} />;
  }
  return <Redirect to="/login" />;
};

WaitToLoginPage.propTypes = {
  path: PropTypes.string,
  authenticated: PropTypes.bool,
  authenticating: PropTypes.bool
};

export default WaitToLoginPage;
