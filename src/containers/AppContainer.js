import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import NavHeader from "../components/navigation/NavHeader";
import NavFooter from "../components/navigation/NavFooter";

import { Container, Segment } from "semantic-ui-react";

import { startAuth, checkSessionTime } from "../actions/index";

const StyledContainer = styled(Container)`
  height: 100vh;
`;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("app props ", props);
  }
  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <Fragment>
        <StyledContainer text style={{ marginTop: "7em" }}>
          <NavHeader sessionToken={this.props.sessionToken} />
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

const mapStateToProps = state => {
  console.log("app state ", state);
  return {
    sessionToken: state.auth.sessionToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => checkSessionTime()
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
