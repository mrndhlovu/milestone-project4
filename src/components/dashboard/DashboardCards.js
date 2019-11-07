import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Card, Header, Progress, Segment, Image } from "semantic-ui-react";

import DashboardStats from "./DashboardStats";
import DashboardCard from "../sharedComponents/DashboardCard";
import { TICKET_STATUS } from "../../constants/constants";

const getPercentage = (total, value) => {
  return (value / total) * 100;
};

const StyledSegment = styled(Segment)`
  background-color: #eee !important;
`;

const FilterTickets = ({ ticketList, value }) => {
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

    return (
      value === status && (
        <Card key={index} fluid>
          {status === TICKET_STATUS.todo && (
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

const DashboardCards = ({ ticketList }) => {
  return (
    <Fragment>
      <DashboardStats ticketList={ticketList} />
      <StyledSegment>
        <Card.Group itemsPerRow={4} stackable>
          <DashboardCard
            header="Backlog"
            color="grey"
            component={
              <FilterTickets
                value={TICKET_STATUS.backlog}
                ticketList={ticketList}
              />
            }
          />

          <DashboardCard
            header="Up Next"
            color="grey"
            component={
              <FilterTickets
                value={TICKET_STATUS.todo}
                ticketList={ticketList}
              />
            }
          />

          <DashboardCard
            header="In Progress"
            color="grey"
            component={
              <FilterTickets
                value={TICKET_STATUS.doing}
                ticketList={ticketList}
              />
            }
          />

          <DashboardCard
            header="Closed"
            color="green"
            component={
              <FilterTickets
                value={TICKET_STATUS.done}
                ticketList={ticketList}
              />
            }
          />
        </Card.Group>
      </StyledSegment>
    </Fragment>
  );
};

export default DashboardCards;
