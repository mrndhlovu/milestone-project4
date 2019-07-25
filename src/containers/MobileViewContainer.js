import PropTypes from "prop-types";
import React, { Component } from "react";

import MobileSideBar from "../components/navigation/MobileSideBar";

import { Responsive, Sidebar } from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileViewContainer extends Component {
  render() {
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <MobileSideBar {...this.props} />
      </Responsive>
    );
  }
}

MobileViewContainer.propTypes = {
  children: PropTypes.node
};

export default MobileViewContainer;
