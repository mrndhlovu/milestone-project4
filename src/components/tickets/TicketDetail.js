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
  Statistic,
  Icon
} from "semantic-ui-react";

const StyledSpan = styled.span`
  padding-left: 0.3rem !important;
  padding-top: 0.8rem !important;
`;

export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeIsDisabled: true
    };
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  componentWillMount() {
    this.props.requestTicketsDetail(this.props.match.params.id);
  }

  handleVoteClick(event, user) {}

  render() {
    const { likeIsDisabled } = this.state;
    const {
      ticket: {
        dataReceived,
        isLoading,
        ticket: { title, created_at, description, votes, views }
      },
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
          subheader={`Filed: ${getFormatedDate(created_at)}`}
        />

        <Divider />

        <Card style={{ paddingLeft: 10 }} fluid>
          <Card.Content header={title} color="blue" />
          <Card.Content description={description} />
          <Card.Content extra>
            <Statistic.Group size="mini" color="grey">
              <Statistic>
                <Statistic.Value>{votes > 0 ? votes : 0}</Statistic.Value>
                <StyledSpan>
                  <Statistic.Label as="a">
                    <Icon
                      name="thumbs up"
                      size="large"
                      color="grey"
                      disabled={
                        isAuthenticated ? !likeIsDisabled : likeIsDisabled
                      }
                      onClick={this.handleVoteClick}
                    />
                  </Statistic.Label>
                </StyledSpan>
              </Statistic>
              <Statistic>
                <Statistic.Value>{views > 0 ? views : 0}</Statistic.Value>
                <StyledSpan>
                  <Statistic.Label>Views</Statistic.Label>
                </StyledSpan>
              </Statistic>
            </Statistic.Group>
          </Card.Content>
        </Card>
        <Segment>
          <Header as="h4" content="Comments" />

          {isAuthenticated ? (
            <TicketComments />
          ) : (
            <Fragment>
              <Message warning attached>
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
