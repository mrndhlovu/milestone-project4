import React, { Component, Fragment } from "react";

import styled from "styled-components";

import NavHeader from "../components/navigation/NavHeader";
import NavFooter from "../components/navigation/NavFooter";

import { Container, Segment } from "semantic-ui-react";

const StyledContainer = styled(Container)`
  height: 100vh;
`;

class AppContainer extends Component {
  render() {
    return (
      <Fragment>
        <StyledContainer text style={{ marginTop: "7em" }}>
          <NavHeader />
          {this.props.children}
        </StyledContainer>
        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <NavFooter />
          </Container>
        </Segment>
      </Fragment>
    );
  }
}

export default AppContainer;
