import PropTypes from "prop-types";
import React, { Component } from "react";

import { Responsive, Segment, Visibility } from "semantic-ui-react";

import DesktopNav from "../components/navigation/DesktopNav";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment textAlign="center" inverted vertical>
            <DesktopNav />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopViewContainer.propTypes = {
  children: PropTypes.node
};

export default DesktopViewContainer;
