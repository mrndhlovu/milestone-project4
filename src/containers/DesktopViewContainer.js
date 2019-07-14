import PropTypes from "prop-types";
import React, { Component } from "react";

import { Responsive, Segment, Visibility } from "semantic-ui-react";
import styled from "styled-components";

import HomepageHeading from "../components/home/HomepageHeading";
import DesktopNav from "../components/navigation/DesktopNav";
import headerImage from "../images/headerImage.jpg";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const StyledSegment = styled(Segment)`
  ${"" /* background-image: url(${headerImage}) !important; */}
  ${"" /* background-position: "center" !important;
  background-size: "contain" !important;
  width: windowWidth * 0.75; */}
  padding-bottom: 5rem !important;
`;

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
          <StyledSegment textAlign="center" inverted vertical>
            <DesktopNav />
            <HomepageHeading />
          </StyledSegment>
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
