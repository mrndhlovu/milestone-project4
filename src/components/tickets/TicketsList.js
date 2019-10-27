import React from "react";

import DashboardCard from "../sharedComponents/DashboardCard";

const TicketsList = ({ component, ticketCount, isLoading, size }) => {
  return (
    <DashboardCard
      header="TICKETS"
      headerSize="h3"
      subheader={`TOTAL:  ${ticketCount}`}
      component={component}
      isLoading={isLoading}
      size={size}
    />
  );
};

export default TicketsList;
