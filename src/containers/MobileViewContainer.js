import PropTypes from "prop-types";
import React from "react";

import MobileSideBarContainer from "./MobileSideBarContainer";

import { Responsive, Sidebar } from "semantic-ui-react";

import { getWidth } from "../utils/appUtils";

const MobileViewContainer = ({ children }) => {
  return (
    <Responsive
      as={Sidebar.Pushable}
      getWidth={getWidth}
      maxWidth={Responsive.onlyMobile.maxWidth}
    >
      <MobileSideBarContainer />
      {children}
    </Responsive>
  );
};

MobileViewContainer.propTypes = {
  children: PropTypes.node
};

export default MobileViewContainer;
