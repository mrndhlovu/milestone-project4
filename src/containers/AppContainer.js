import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import MobileViewContainer from "./MobileViewContainer";
import DesktopViewContainer from "./DesktopViewContainer";

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopViewContainer children={children}>{children}</DesktopViewContainer>
    <MobileViewContainer children={children}>{children}</MobileViewContainer>
  </div>
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
