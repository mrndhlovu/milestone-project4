import React from "react";

import { Statistic, Card } from "semantic-ui-react";
import { TICKET_STATUS } from "../../constants/constants";

const StatField = ({ label, value }) => {
  return (
    <Statistic>
      <Statistic.Value>{value}</Statistic.Value>
      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  );
};

const DashboardStats = ({ ticketList }) => {
  const getTotal = value => {
    let total = [];
    Object.keys(ticketList).forEach(index => {
      const { status } = ticketList[index];

      status === value && total.push(ticketList[index]);
      ticketList[index][value] && total.push(ticketList[index]);
    });
    return total.length;
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header as="h5">Unicorn Attactor Dashboard</Card.Header>
        <Statistic.Group>
          <StatField label="Bugs" value={getTotal(TICKET_STATUS.is_bug)} />
          <StatField
            label="Features"
            value={getTotal(TICKET_STATUS.is_feature)}
          />
          <StatField label="Completed" value={getTotal(TICKET_STATUS.done)} />
        </Statistic.Group>
      </Card.Content>
    </Card>
  );
};

export default DashboardStats;
