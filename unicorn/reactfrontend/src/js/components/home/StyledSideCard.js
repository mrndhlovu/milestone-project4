import React, { Component, Fragment } from "react";

import styled from "styled-components";

import Card from "react-bootstrap/Card";

const StyledCardSide = styled(Card)`
  width: auto !important;
  height: 35vh !important;
`;

export class StyledSideCard extends Component {
  render() {
    return (
      <Fragment>
        <StyledCardSide bg="light">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Light Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </StyledCardSide>
      </Fragment>
    );
  }
}

export default StyledSideCard;
