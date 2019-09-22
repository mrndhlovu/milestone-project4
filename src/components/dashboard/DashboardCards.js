import React from "react";
import { Link } from "react-router-dom";

import { Card, Header, Progress } from "semantic-ui-react";

import DashboardStats from "./DashboardStats";
import DashboardCardWrapper from "../sharedComponents/DashboardCardWrapper";

const getPercentage = (total, value) => {
  return (value / total) * 100;
};

const FilterTickets = ({ ticketList, value }) => {
  return Object.keys(ticketList).map(index => {
    const { title, username, short_desc, status, votes, id } = ticketList[
      index
    ];

    return (
      value === status && (
        <Card key={index} fluid>
          {status === "todo" && (
            <Progress
              percent={getPercentage(2, votes)}
              attached="top"
              warning
            />
          )}

          <Card.Content>
            <Card.Header as={Link} to={`/ticket/${id}`}>
              {title}
            </Card.Header>
            <Card.Meta>{username}</Card.Meta>
            <Card.Description>{short_desc}</Card.Description>
          </Card.Content>
          <Card.Content textAlign="right">
            <Header as="h5" textAlign="left" style={{}}>
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
    <Card.Group>
      <DashboardStats ticketList={ticketList} />
      <Card.Group itemsPerRow={3}>
        <DashboardCardWrapper header="Todo" color="grey">
          <FilterTickets value="todo" ticketList={ticketList} />
        </DashboardCardWrapper>
        <DashboardCardWrapper header="In Progress" color="grey">
          <FilterTickets value="doing" ticketList={ticketList} />
        </DashboardCardWrapper>
        <DashboardCardWrapper header="Completed" color="green">
          <FilterTickets value="done" ticketList={ticketList} />
        </DashboardCardWrapper>
      </Card.Group>
    </Card.Group>
  );
};

export default DashboardCards;
