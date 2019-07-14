import PropTypes from "prop-types";
import React from "react";

import { Button, Container, Header, Icon } from "semantic-ui-react";

const headerText = "Unicorn Attractor";

const HomepageHeading = ({ mobile }) => (
  <Container>
    <Header
      as="h1"
      content={headerText}
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
      content="Will find a fix for that bug!"
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
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

export default HomepageHeading;
