import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
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

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export default AppContainer;
