import React from "react";

import { Statistic } from "semantic-ui-react";
import DashboardCard from "../sharedComponents/DashboardCard";

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
    <DashboardCard
      attached
      header="Current"
      component={
        <Statistic.Group>
          <StatField label="Bugs" value={getTotal("is_bug")} />
          <StatField label="Features" value={getTotal("is_feature")} />
          <StatField label="Completed" value={getTotal("done")} />
        </Statistic.Group>
      }
    />
  );
};

export default DashboardStats;
