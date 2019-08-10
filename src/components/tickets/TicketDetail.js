import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { requestTicketsDetail } from "../../actions/TicketActions";
import { getFormatedDate } from "../../constants/constants";
import TicketComments from "./TicketComments";
import UILoadingSpinner from "../../utils/UILoadingSpinner";

import {
  Button,
  Card,
  Container,
  Divider,
  Header,
  Message,
  Segment,
  Statistic
} from "semantic-ui-react";

const StyledSpan = styled.span`
  padding-left: 0.3rem;
`;

export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.requestTicketsDetail(this.props.match.params.id);
  }

  render() {
    const {
      ticket: {
        dataReceived,
        isLoading,
        ticket: { title, created_at, description, votes, views }
      },
      authUser,
      authUser: { isAuthenticated }
    } = this.props;

    return dataReceived && isLoading ? (
      <UILoadingSpinner />
    ) : (
      <Container style={{ paddingTop: 20 }}>
        <div style={{ paddingTop: 10 }}>
          <Button
            color="blue"
            size="tiny"
            floated="right"
            as={NavLink}
            to="/create-ticket"
          >
            Create a ticket
          </Button>
        </div>
        <Header
          as="h3"
          color="blue"
          subheader={`Ticket filed: ${getFormatedDate(created_at)}`}
        />

        <Divider />

        <Card style={{ paddingLeft: 10 }} fluid>
          <Card.Content header={title} color="blue" />

          <Card.Content description={description} />
          <Card.Content extra>
            <Statistic.Group size="mini" color="grey">
              <Statistic>
                <Statistic.Value>{votes}</Statistic.Value>
                <Statistic.Label>Votes</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{views}</Statistic.Value>
                <Statistic.Label>Views</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Card.Content>
        </Card>
        <Segment>
          {isAuthenticated ? (
            <TicketComments />
          ) : (
            <Fragment>
              <Header as="h4" content="Comments" />
              <Message negative>
                To view and make comments you need a
                <StyledSpan>
                  <NavLink to="/pricing">Unicorn Pro Account.</NavLink>
                </StyledSpan>
              </Message>
            </Fragment>
          )}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ticket: state.ticketDetail,
    authUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  { requestTicketsDetail }
)(TicketDetail);
