import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Dimmer, Loader } from "semantic-ui-react";

import { getUser } from "../selectors/appSelectors";

const AuthRouteCheck = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { isLoading } = auth;
      if (!auth.isAuthenticated && !isLoading) {
        return <Redirect to="/login" />;
      } else if (isLoading) {
        return (
          <Fragment>
            <Dimmer active inverted>
              <Loader size="mini">Loading</Loader>
            </Dimmer>
          </Fragment>
        );
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => {
  return {
    auth: getUser(state)
  };
};

export default connect(mapStateToProps)(AuthRouteCheck);
