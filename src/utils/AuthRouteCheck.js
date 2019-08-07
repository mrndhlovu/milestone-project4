import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Dimmer, Loader, Image } from "semantic-ui-react";

const AuthRouteCheck = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { isLoading, isAuthenticated } = auth;
      return !isAuthenticated ? (
        <Redirect to="/login" />
      ) : isLoading ? (
        <Fragment>
          <Dimmer active inverted>
            <Loader size="mini">Loading</Loader>
          </Dimmer>
          <Image src="/images/wireframe/short-paragraph.png" />
        </Fragment>
      ) : (
        <Component {...props} />
      );
    }}
  />
);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AuthRouteCheck);
