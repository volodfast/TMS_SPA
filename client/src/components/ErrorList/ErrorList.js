import React from "react";
import PropTypes from "prop-types";

import Error from "./Error/Error";

import "./ErrorList.css";

const ErrorList = props => {
  let errors = null;

  if (props.errors) {
    errors = props.errors.map((error, i) => {
      return <Error key={"error-" + i} message={error} />;
    });
  }

  return <ul className="error-list">{errors}</ul>;
};
ErrorList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};

export default ErrorList;
