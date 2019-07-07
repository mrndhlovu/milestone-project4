import React, { Component, Fragment } from "react";
import styled from "styled-components";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Cards from "./Cards";
import StyledSideCard from "./StyledSideCard";

const StyledJumbotron = styled(Jumbotron)`
  width: 100%;
  height: 50vh;
`;

// const StyledJumbotronTextCard = div`
//   margin-top: 300px;
// `;

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <StyledJumbotron>
          <div>
            <h1>UNICORN ATTRACTOR</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
        </StyledJumbotron>
        <Container>
          <Row>
            <Col sm={8}>
              <Cards />
            </Col>
            <Col sm={4}>
              <StyledSideCard />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Home;
