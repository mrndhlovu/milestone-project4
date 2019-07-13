import PropTypes from "prop-types";
import React, { Component } from "react";

import { Responsive, Segment, Visibility } from "semantic-ui-react";

import HomepageHeading from "../components/home/HomepageHeading";
import DesktopNav from "../components/navigation/DesktopNav";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopViewContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <DesktopNav />
            <HomepageHeading />
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
