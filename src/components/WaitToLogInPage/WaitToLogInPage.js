import React from "react";
import { Redirect } from "react-router-dom";

export default props => {
  if (props.authenticating) {
    return <div>Wait to check if you are logged in...</div>;
  }
  if (props.authenticated) {
    return <Redirect to={props.path} />;
  }
  return <Redirect to="/login" />;
};
