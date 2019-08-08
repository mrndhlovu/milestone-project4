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
  text-justify: center !important;
`;

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Unicorn Attractor",
      headerButtonUrl: "/pricing",
      headerButtonText: "Get Started",
      subHeading: "Head start on coding issues and save hours!"
    };
    this.handlelogout = this.handlelogout.bind(this);
  }

  handlelogout() {
    this.props.logOut();
  }
  render() {
    const {
      headerText,
      headerButtonUrl,
      headerButtonText,
      subHeading
    } = this.state;
    return (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText, subHeading }}
        />

        <Segment style={{ padding: "4em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
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
              <Grid.Column floated="right" width={6}>
                <Image bordered rounded src={image_1} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="large" color="orange" as={NavLink} to="/pricing">
                  <StyledHeaderSpan>Explore Pro Service</StyledHeaderSpan>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "0em" }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Header as="h3">
                  <StyledHeaderSpan>File your ticket</StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Head start on coding issues and save hours!
                </p>
                <Header as="h3">
                  <StyledHeaderSpan>
                    Learn about the Unicorn Project{" "}
                  </StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Learn more on how it is structure and how it runs
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Image src={image_2} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "3em 0em" }} vertical>
          <Container text>
            <Header as="h3">
              <StyledHeaderSpan> Make a kind contribution</StyledHeaderSpan>
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              To keep the business run and the lights on, you can make a kind
              contribution.
            </p>
            <Button
              as={NavLink}
              to="/checkout"
              color="orange"
              as="a"
              size="medium"
            >
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
