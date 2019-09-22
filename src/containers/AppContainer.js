import PropTypes from "prop-types";
import React, { Fragment } from "react";

import styled from "styled-components";

import MobileViewContainer from "./MobileViewContainer";
import DesktopViewContainer from "./DesktopViewContainer";
import NavFooter from "../components/navigation/NavFooter";

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

const AppContainer = ({ children }) => {
  return (
    <ResponsiveContainer>
      <StyledDiv>{children}</StyledDiv>
      <NavFooter />
    </ResponsiveContainer>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export default AppContainer;
