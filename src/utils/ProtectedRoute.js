import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../selectors/appSelectors";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const { isLoading, isAuthenticated } = auth;

        if (!isAuthenticated && !isLoading) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
const mapStateToProps = state => {
  return {
    auth: getUser(state)
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
