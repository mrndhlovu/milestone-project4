import React from "react";

import { Statistic } from "semantic-ui-react";
import DashboardCardWrapper from "../sharedComponents/DashboardCardWrapper";

const DashboardStats = ({}) => {
  return (
    <DashboardCardWrapper attached header="Current">
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>22</Statistic.Value>
          <Statistic.Label>Bugs</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>31,200</Statistic.Value>
          <Statistic.Label>Features</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>2662</Statistic.Value>
          <Statistic.Label>Completed</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </DashboardCardWrapper>
  );
};

export default DashboardStats;
