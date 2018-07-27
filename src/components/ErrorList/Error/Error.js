import React from "react";
import PropTypes from "prop-types";

import "./Error.css";

const Error = props => {
  return <li className="error">{props.message}</li>;
};

Error.propTypes = {
  message: PropTypes.string
};

export default Error;
