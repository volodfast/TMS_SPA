import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WaitToLogInPage from "../../components/WaitToLogInPage/WaitToLogInPage";

const ProtectedRoute = ({
  component: Component,
  authenticated,
  authenticating,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        let output = <Component {...props} />;

        if (authenticated === false) {
          output = (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        if (authenticating) {
          output = (
            <WaitToLogInPage
              path={props.path}
              authenticated={authenticated}
              authenticating={authenticating}
            />
          );
        }

        return output;
      }}
    />
  );
};

function mapStateToProps(state) {
  return {
    authenticating: state.auth.authenticating
  };
}

export default connect(mapStateToProps)(ProtectedRoute);

ProtectedRoute.propTypes = {
  path: PropTypes.string,
  authenticated: PropTypes.bool,
  exact: PropTypes.bool,
  component: PropTypes.func
};
