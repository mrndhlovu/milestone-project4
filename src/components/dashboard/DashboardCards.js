import React from "react";
import { Link } from "react-router-dom";

import { Card, Header, Progress, Grid } from "semantic-ui-react";

import DashboardStats from "./DashboardStats";
import DashboardCard from "../sharedComponents/DashboardCard";
import DashboardBarChart from "./DashboardBarChart";
import DashboardPieChart from "./DashboardPieChart";

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
            <Header as="h5" textAlign="left">
              Votes: {votes}
            </Header>
          </Card.Content>
        </Card>
      )
    );
  });
};

const DashboardCards = ({ ticketList, chartData }) => {
  return (
    <Card.Group>
      <DashboardStats ticketList={ticketList} />

      <Grid stackable columns={2} style={{ width: "100%" }}>
        <Grid.Column>
          <DashboardBarChart chartData={chartData} />
        </Grid.Column>
        <Grid.Column>
          <DashboardPieChart chartData={chartData} />
        </Grid.Column>
      </Grid>

      <Card.Group itemsPerRow={3} stackable style={{ paddingTop: 15 }}>
        <DashboardCard
          header="Todo"
          color="grey"
          component={<FilterTickets value="todo" ticketList={ticketList} />}
        />

        <DashboardCard
          header="In Progress"
          color="grey"
          component={<FilterTickets value="doing" ticketList={ticketList} />}
        />

        <DashboardCard
          header="Completed"
          color="green"
          component={<FilterTickets value="done" ticketList={ticketList} />}
        />
      </Card.Group>
    </Card.Group>
  );
};

export default DashboardCards;
