import React from "react";
import { Link } from "react-router-dom";

import { Card, Header, Progress, Image } from "semantic-ui-react";

import { TICKET_STATUS } from "../../constants/constants";

const getPercentage = (total, value) => {
  return (value / total) * 100;
};

export const DashboardCardStatus = ({ ticketList, cardType, dataTestId }) => {
  return Object.keys(ticketList).map(index => {
    const {
      title,
      username,
      short_desc,
      status,
      votes,
      id,
      image
    } = ticketList[index];

    const cardMatch = cardType === status;
    const showTicketVoteProgress = status === TICKET_STATUS.todo;

    return (
      cardMatch && (
        <Card key={index} fluid data-test-id={`${dataTestId}-${index}`}>
          {showTicketVoteProgress && (
            <Progress
              percent={getPercentage(2, votes)}
              attached="top"
              warning
            />
          )}

          <Card.Content>
            <Image floated="right" size="mini" src={image} />
            <Card.Header as={Link} to={`/ticket/${id}`}>
              {title}
            </Card.Header>
            <Card.Meta>{username}</Card.Meta>
            <Card.Description>{short_desc}</Card.Description>
          </Card.Content>
          <Card.Content textAlign="right">
            <Header as="h5" textAlign="left">
              Votes: {votes}
            </Header>
          </Card.Content>
        </Card>
      )
    );
  });
};
