import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Segment
} from "semantic-ui-react";

import { logOut } from "../../actions/AuthActions";

import HeadingImage from "./HeadingImage";
import image_1 from "../../images/image_1.jpg";
import image_2 from "../../images/image_2.jpg";

const StyledHeaderSpan = styled.span`
  text-transform: uppercase;
`;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlelogout = this.handlelogout.bind(this);
  }

  handlelogout() {
    this.props.logOut();
  }
  render() {
    return (
      <Fragment>
        <HeadingImage />
        <Segment style={{ padding: "3rem 0rem" }} vertical>
          <Grid container stackable verticalAlign="middle" textAlign="center">
            <Grid.Row>
              <Grid.Column floated="left" textAlign="center" width={8}>
                <Image bordered rounded src={image_1} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3">
                  <StyledHeaderSpan>
                    Problems are everywhere, solutions are here!
                  </StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.2rem" }}>
                  We've got you covered for with all python, react, django,
                  flask, code issues.
                </p>
                <Header as="h3">
                  <StyledHeaderSpan>Explore Unicorn-Pro </StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.2rem" }}>
                  Get your questions or issues resolved in no time
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="medium" color="orange" as={NavLink} to="/pricing">
                  <StyledHeaderSpan>Explore Pro Service</StyledHeaderSpan>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "0rem" }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column
                style={{ paddingBottom: "5rem", paddingTop: "5rem" }}
              >
                <Header as="h2">
                  <StyledHeaderSpan>File your ticket</StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.3rem" }}>
                  Head start on coding issues and save hours!
                </p>
                <Header as="h2">
                  <StyledHeaderSpan>
                    Learn about the Unicorn Project{" "}
                  </StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.3rem" }}>
                  Learn more on how it is structure and how it runs, we tell it
                  all
                </p>
              </Grid.Column>
              <Grid.Column
                style={{ paddingBottom: "3rem", paddingTop: "2em" }}
                width={8}
              >
                <Image bordered rounded src={image_2} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "3rem 0rem" }} textAlign="center" vertical>
          <Container text>
            <Header as="h2">
              <StyledHeaderSpan> Make a kind contribution</StyledHeaderSpan>
            </Header>
            <p style={{ fontSize: "1.3rem" }}>
              To keep the business run and the lights on, you can make a kind
              contribution.
            </p>
            <Button as={NavLink} to="/checkout" color="orange" size="medium">
              Make a Donation
            </Button>
          </Container>
        </Segment>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logOut }
)(Home);
