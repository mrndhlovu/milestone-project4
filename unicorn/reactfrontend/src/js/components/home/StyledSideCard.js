import React, { Component, Fragment } from "react";

import styled from "styled-components";

import Card from "react-bootstrap/Card";
import TicketsList from "../tickets/TicketsList";

const StyledCardSide = styled(Card)`
  width: auto !important;
  height: 35vh !important;
`;

export class StyledSideCard extends Component {
  render() {
    return (
      <Fragment>
        <StyledCardSide bg="light">
          <Card.Header>Tickets List</Card.Header>
          <TicketsList />
        </StyledCardSide>
      </Fragment>
    );
  }
}

export default StyledSideCard;
