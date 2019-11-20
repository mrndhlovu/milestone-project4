import React, { Fragment } from "react";
import styled from "styled-components";

import { Card, Segment, Container, Grid } from "semantic-ui-react";

import { getObjectLength } from "../../utils/appUtils";
import { getPageId } from "../../utils/urls";
import ListSideBar from "./ListSideBar";
import PageHeader from "../sharedComponents/PageHeader";
import StyledMessage from "../sharedComponents/StyledMessage";
import Tickets from "./Tickets";

const SytledContainer = styled(Container)`
  padding: 20px 5px;
  background-color: #eee;
`;

const TicketsList = ({
  tickets,
  isLoading,
  allAccess,
  buttonText,
  handleAddToCart
}) => {
  const ticketCount = getObjectLength(tickets);

  return (
    <Fragment>
      <PageHeader
        pageId={getPageId()}
        dataTestId="tickets-page-header"
        buttonId="from-list-open-ticket"
      />

      <SytledContainer fluid data-test-id="ticket-list-container">
        <Grid stackable columns={2} data-test-id="ticket-grid-container">
          <Grid.Column width={4}>
            <ListSideBar data={tickets} />
          </Grid.Column>

          <Grid.Column width={12}>
            <Card fluid>
              <Card.Content>
                <Card.Header as="h3" content={`${ticketCount} TICKETS`} />
                <Segment attached stacked loading={isLoading}>
                  {tickets.length > 0 ? (
                    <Tickets
                      handleAddToCart={handleAddToCart}
                      ticketsList={tickets}
                      allAccess={allAccess}
                      buttonText={buttonText}
                    />
                  ) : (
                    <StyledMessage
                      message="No tickets at this time."
                      redirect="/create-ticket"
                      linkText="Create a ticket"
                    />
                  )}
                </Segment>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </SytledContainer>
    </Fragment>
  );
};

export default TicketsList;
