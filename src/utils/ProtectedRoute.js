import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getUser } from "../selectors/appSelectors";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  const via = rest.location.pathname.slice(1).split("/")[0];

  return (
    <Route
      {...rest}
      render={props => {
        const { isLoading, isAuthenticated } = auth;

        if (!isAuthenticated && !isLoading) {
          return (
            <Redirect
              to={{
                pathname: `/login`,
                state: { from: props.location, via: via }
              }}
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
