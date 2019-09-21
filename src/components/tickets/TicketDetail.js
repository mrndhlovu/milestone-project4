import React from "react";

import { Card } from "semantic-ui-react";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";

const TicketDetail = ({ description, isLoading, title }) => {
  return isLoading ? (
    <UILoadingSpinner />
  ) : (
    <Card style={{ paddingLeft: 10 }} fluid>
      <Card.Content header={title} color="blue" />
      <Card.Content description={description} />
    </Card>
  );
};

export default TicketDetail;
