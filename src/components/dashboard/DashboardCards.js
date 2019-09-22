import React from "react";
import { Link } from "react-router-dom";

import { Card, Icon } from "semantic-ui-react";

import DashboardStats from "./DashboardStats";
import DashboardCardWrapper from "../sharedComponents/DashboardCardWrapper";

const FilterTickets = ({ ticketList, value }) => {
  return Object.keys(ticketList).map(index => {
    const { title, username, short_desc, status } = ticketList[index];

    return (
      value === status && (
        <Card key={index} fluid>
          <Card.Content>
            <Card.Header as={Link} to="/">
              {title}
            </Card.Header>
            <Card.Meta>{username}</Card.Meta>
            <Card.Description>{short_desc}</Card.Description>
          </Card.Content>

          <Card.Content extra>
            <a>
              <Icon
                name="circle"
                color={
                  status === "todo"
                    ? "red"
                    : status === "doing"
                    ? "green"
                    : "orange"
                }
              />
              {status}
            </a>
          </Card.Content>
        </Card>
      )
    );
  });
};

const DashboardCards = ({ ticketList }) => {
  return (
    <Card.Group>
      <DashboardStats />
      <Card.Group itemsPerRow={3}>
        <DashboardCardWrapper header="Todo">
          <FilterTickets value="todo" ticketList={ticketList} />
        </DashboardCardWrapper>
        <DashboardCardWrapper header="Doing">
          <FilterTickets value="doing" ticketList={ticketList} />
        </DashboardCardWrapper>
        <DashboardCardWrapper header="Done">
          <FilterTickets value="done" ticketList={ticketList} />
        </DashboardCardWrapper>
      </Card.Group>
    </Card.Group>
  );
};

export default DashboardCards;
