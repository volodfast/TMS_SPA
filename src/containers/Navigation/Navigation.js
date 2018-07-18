import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/actions";

import "./Navigation.css";

const Navigation = props => {
  const navMenu = props.authenticated ? (
    <ul className="nav navbar-nav navbar-right">
      <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown">
          Account <b className="caret" />
        </a>
        <ul className="dropdown-menu">
          <li>
            <Link to="/">Profile</Link>
          </li>
          <li>
            <Link to="/user/edit">Settings</Link>
          </li>
          <li className="divider" />
          <li>
            <a onClick={props.logout}>Logout</a>
          </li>
        </ul>
      </li>
    </ul>
  ) : (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/">Sign Up</Link>
      </li>
    </ul>
  );

  return (
    <header className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
        <Link to="/" id="logo">
          Task Management System
        </Link>
        <nav>{navMenu}</nav>
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
