import React from "react";

import { Card, Segment } from "semantic-ui-react";

const DashboardCard = ({
  header,
  color,
  cardStatus,
  otherProps,
  subheader,
  isLoading,
  headerSize
}) => (
  <Card fluid>
    <Card.Content>
      <Card.Header as={headerSize} color={color} subheader={subheader}>
        {header}
      </Card.Header>
      <Segment attached stacked loading={isLoading}>
        {cardStatus}
      </Segment>
      {otherProps}
    </Card.Content>
  </Card>
);

export default DashboardCard;
