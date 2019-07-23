import PropTypes from "prop-types";
import React, { Component } from "react";

import { Button, Container, Header, Icon } from "semantic-ui-react";

class HomepageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      mobile,
      data: { headerText, headerButtonText, headerButtonUrl }
    } = this.props;

    return (
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
          {headerButtonText}
          <Icon name="right arrow" />
        </Button>
      </Container>
    );
  }
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

export default HomepageHeading;
