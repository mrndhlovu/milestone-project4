import React, { Component, Fragment } from "react";

import Container from "react-bootstrap/Container";

import Header from "../components/navigation/Header";

export class AppContainer extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Container>{this.props.children}</Container>
      </Fragment>
    );
  }
}

export default AppContainer;
