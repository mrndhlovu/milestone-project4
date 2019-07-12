import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Button, Container, Header, Icon } from "semantic-ui-react";

const StyledContainer = styled(Container)`
  height: 10vh !important;
  margin-bottom: 2rem !important;
`;

const HomepageHeading = ({ mobile }) => (
  <StyledContainer>
    <Header
      as="h1"
      content="Unicorn Attractor"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </StyledContainer>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

export default HomepageHeading;
