import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { formatDate } from "../../helpers/helpers";

import "./UserInfo.css";

const UserInfo = props => {
  const date = formatDate(props.date);
  return (
    <section className="user_info col-md-4">
      <h1>{props.user.fullName}</h1>
      <p>
        Today is: <span className="dateline">{date}</span>
      </p>

      <Link to="/tasks/new" className="btn btn-primary">
        Create New Task
      </Link>
    </section>
  );
};

UserInfo.propTypes = {
  date: PropTypes.string,
  user: PropTypes.shape({
    fullName: PropTypes.string
  })
};

export default UserInfo;
