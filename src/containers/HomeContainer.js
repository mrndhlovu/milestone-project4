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
  Segment,
  Icon
} from "semantic-ui-react";

import { logOut } from "../actions/AuthActions";

import PageHeader from "../components/sharedComponents/PageHeader";
import { getUser } from "../selectors/appSelectors";
import { DEFAULT_IMAGES } from "../constants/constants";

const StyledHeaderSpan = styled.span`
  text-transform: uppercase;
`;

export class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.handlelogout = this.handlelogout.bind(this);
  }

  handlelogout() {
    this.props.logOut();
  }
  render() {
    return (
      <Fragment>
        <PageHeader />
        <Segment style={{ padding: "3rem 0rem" }} vertical>
          <Grid container stackable verticalAlign="middle" textAlign="center">
            <Grid.Row>
              <Grid.Column floated="left" textAlign="center" width={8}>
                <Image bordered rounded src={DEFAULT_IMAGES.homeImage1} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3">
                  <StyledHeaderSpan>
                    Bugs are everywhere, solutions are here!
                  </StyledHeaderSpan>
                </Header>
                <p style={{ fontSize: "1.2rem" }}>
                  We've got you covered, Python, React, Django, code issues.
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
                  <StyledHeaderSpan>All Access Account</StyledHeaderSpan>
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
                  <StyledHeaderSpan>File a ticket</StyledHeaderSpan>
                </Header>
                <Icon name="bug" />

                <p style={{ fontSize: "1.3rem" }}>
                  Bugs issues will be attended to if enough votes are made.
                </p>
                <Header as="h2">
                  <StyledHeaderSpan>Features require payment.</StyledHeaderSpan>
                </Header>
                <Icon name="code" />
                <p style={{ fontSize: "1.3rem" }}>
                  For Just €5 you can have you issue fixed immediately
                </p>
              </Grid.Column>
              <Grid.Column
                style={{ paddingBottom: "3rem", paddingTop: "2em" }}
                width={8}
              >
                <Image bordered rounded src={DEFAULT_IMAGES.homeImage2} />
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
              To keep the business running and the lights on, you can make a
              kind contribution.
            </p>
            <Button as={NavLink} to="/checkout" color="orange" size="medium">
              <Icon name="heart" />
              Make a Donation
            </Button>
          </Container>
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(HomeContainer);
