import React from "react";

import Error from "./Error/Error";

import "./ErrorList.css";

export default props => {
  let errors = null;

  if (props.errors) {
    errors = props.errors.map((error, i) => {
      return <Error key={"error-" + i} message={error} />;
    });
  }

  return <ul className="error-list">{errors}</ul>;
};
