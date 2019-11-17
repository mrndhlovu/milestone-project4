import React, { Fragment } from "react";
import styled from "styled-components";

import { Card, Segment } from "semantic-ui-react";

import DashboardStats from "./DashboardStats";
import DashboardCard from "../sharedComponents/DashboardCard";
import { TICKET_STATUS } from "../../constants/constants";
import { DashboardCardStatus } from "./DashboardCardStatus";

const StyledSegment = styled(Segment)`
  background-color: #eee !important;
`;

const DashboardCards = ({ ticketList }) => {
  return (
    <Fragment>
      <DashboardStats ticketList={ticketList} />
      <StyledSegment data-test-id="statistic-cards-container">
        <Card.Group itemsPerRow={4} stackable data-test-id="card-group">
          <DashboardCard
            header="Backlog"
            color="grey"
            cardStatus={
              <DashboardCardStatus
                cardType={TICKET_STATUS.backlog}
                ticketList={ticketList}
              />
            }
          />

          <DashboardCard
            header="Up Next"
            color="grey"
            cardStatus={
              <DashboardCardStatus
                cardType={TICKET_STATUS.todo}
                ticketList={ticketList}
              />
            }
          />

          <DashboardCard
            header="In Progress"
            color="grey"
            cardStatus={
              <DashboardCardStatus
                cardType={TICKET_STATUS.doing}
                ticketList={ticketList}
              />
            }
          />

          <DashboardCard
            header="Closed"
            color="green"
            cardStatus={
              <DashboardCardStatus
                cardType={TICKET_STATUS.done}
                ticketList={ticketList}
              />
            }
          />
        </Card.Group>
      </StyledSegment>
    </Fragment>
  );
};

export default DashboardCards;
