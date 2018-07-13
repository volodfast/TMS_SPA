import React from "react";

import "./Error.css";

export default props => {
  return <li className="error">{props.message}</li>;
};
