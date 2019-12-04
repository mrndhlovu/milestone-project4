import React from "react";
import { Link } from "react-router-dom";

import { Card, Header, Progress, Image, Label } from "semantic-ui-react";

import { TICKET_STATUS } from "../../constants/constants";

const getProgressionPercentage = (total, value) => {
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
      image,
      is_bug
    } = ticketList[index];

    const cardMatch = cardType === status;
    const showTicketVoteProgression = status === TICKET_STATUS.todo;
    const ticketLabel = is_bug ? "Bug" : "Feature";
    const labelColor = is_bug ? "green" : "purple";
    const hasVotes = votes !== 0;

    return (
      cardMatch && (
        <Card key={index} fluid data-test-id={`${dataTestId}-${index}`}>
          {showTicketVoteProgression && hasVotes && (
            <Progress
              percent={getProgressionPercentage(5, votes)}
              progress
              color="green"
            >
              Vote priority measure
            </Progress>
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

            <Label color={labelColor}>{ticketLabel}</Label>
          </Card.Content>
        </Card>
      )
    );
  });
};
