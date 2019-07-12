import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import MobileViewContainer from "./MobileViewContainer";
import DesktopViewContainer from "./DesktopViewContainer";

const StyledDiv = styled.div`
  margin-top: 2rem !important;
`;

const ResponsiveContainer = ({ children }) => (
  <Fragment>
    <DesktopViewContainer>
      <StyledDiv>{children}</StyledDiv>
    </DesktopViewContainer>
    <MobileViewContainer>{children}</MobileViewContainer>
  </Fragment>
);

class AppContainer extends Component {
  render() {
    return <ResponsiveContainer>{this.props.children}</ResponsiveContainer>;
  }
}
const mapStateToProps = state => {
  console.log("State in app", state);

  return { auth: state };
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export default connect(mapStateToProps)(AppContainer);
