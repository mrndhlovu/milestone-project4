import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { getHeaderObject } from "../../constants/headerConstants";

import { Button, Header, Icon, Segment, Image } from "semantic-ui-react";
import { DEFAULT_IMAGES } from "../../constants/constants";

const StyledSegment = styled(Segment)`
  padding-bottom: 5rem !important;
`;

const styles = {
  width: "100%",
  height: "100vh",
  opacity: "0.1",
  position: "fixed"
};

export const PageHeader = ({
  mobile,
  customHeader,
  headerObject,
  hideButton
}) => {
  const {
    headerText,
    headerButtonText,
    headerButtonUrl,
    subHeading,
    image
  } = customHeader ? headerObject : getHeaderObject();

  return (
    <StyledSegment textAlign="center" inverted vertical>
      <Image size="large" src={DEFAULT_IMAGES.signup} style={styles} />
      <Header
        as="h1"
        content={headerText}
        inverted
        style={{
          fontSize: mobile ? "2em" : "3em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1em" : "1em"
        }}
      />
      <Header
        as="h2"
        content={subHeading}
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      />
      {!hideButton && (
        <Button
          primary
          color="linkedin"
          size="large"
          as={NavLink}
          to={headerButtonUrl}
        >
          {headerButtonText}
          <Icon name="right arrow" />
        </Button>
      )}
    </StyledSegment>
  );
};

PageHeader.propTypes = {
  mobile: PropTypes.bool
};

export default PageHeader;
