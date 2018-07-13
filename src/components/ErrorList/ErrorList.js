import React from "react";

import Error from "./Error/Error";

import "./ErrorList.css";

export default props => {
    let errors = null;

    if (props.errors) {
        errors = props.errors.map(error => {
            return <Error key={error.status} message={error.message} />;
        });
    }

    return <ul className="error-list">{errors}</ul>;
};
