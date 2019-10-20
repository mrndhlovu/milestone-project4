import PropTypes from "prop-types";
import React from "react";

import { Responsive, Segment, Visibility } from "semantic-ui-react";

import DesktopNavContainer from "../containers/DesktopNavContainer";

import { getWidth } from "../utils/appUtils";

const DesktopViewContainer = ({ children, showFixedMenu, hideFixedMenu }) => {
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Segment textAlign="center" inverted vertical>
          <DesktopNavContainer />
        </Segment>
      </Visibility>
      {children}
    </Responsive>
  );
};

DesktopViewContainer.propTypes = {
  children: PropTypes.node
};

export default DesktopViewContainer;
