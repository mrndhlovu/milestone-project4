import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import MobileViewContainer from "./MobileViewContainer";
import DesktopViewContainer from "./DesktopViewContainer";
import { authState } from "../actions/AuthActions";
import NavFooter from "../components/navigation/NavFooter";

import { Segment } from "semantic-ui-react";

const StyledDiv = styled.div`
  min-height: 60rem;
  overflow: hidden;
  padding-bottom: 2rem;
`;

const ResponsiveContainer = ({ children }) => (
  <Fragment>
    <DesktopViewContainer>{children}</DesktopViewContainer>
    <MobileViewContainer>{children}</MobileViewContainer>
  </Fragment>
);

class AppContainer extends Component {
  componentDidMount() {
    this.props.authState();
  }

  render() {
    return (
      <ResponsiveContainer>
        <StyledDiv>{this.props.children}</StyledDiv>
        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <NavFooter />
        </Segment>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth
  };
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export default connect(
  mapStateToProps,
  { authState }
)(AppContainer);
