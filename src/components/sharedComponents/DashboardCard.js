import React from "react";

import { Card, Header, Segment } from "semantic-ui-react";

const DashboardCard = ({ header, color, component }) => (
  <Card fluid padded="true">
    <Header as="h4" attached content={header} color={color} />

    <Segment attached stacked>
      {component}
    </Segment>
  </Card>
);

export default DashboardCard;
