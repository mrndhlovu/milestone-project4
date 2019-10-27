import React from "react";
import { getDynamicHeader } from "../../constants/headerConstants";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { Button, Header, Icon, Segment } from "semantic-ui-react";

const StyledSegment = styled(Segment)`
  padding-bottom: 5rem !important;
`;

const DynamicHeader = ({ option, mobile }) => {
  const {
    headerText,
    headerButtonText,
    headerButtonUrl,
    subHeading
  } = getDynamicHeader(option);

  return (
    <div>
      <StyledSegment textAlign="center" inverted vertical>
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
      </StyledSegment>
    </div>
  );
};

export default DynamicHeader;
