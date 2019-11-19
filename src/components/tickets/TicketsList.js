import React, { Fragment } from "react";
import styled from "styled-components";

import StyledMessage from "../sharedComponents/StyledMessage";
import Tickets from "./Tickets";
import { getObjectLength } from "../../utils/appUtils";

import { Card, Segment, Container, Grid } from "semantic-ui-react";
import PageHeader from "../sharedComponents/PageHeader";
import { getPageId } from "../../utils/urls";
import ListSideBar from "./ListSideBar";

const SytledContainer = styled(Container)`
  padding: 20px 5px;
  background-color: #eee;
`;

const TicketsList = ({
  tickets,
  isLoading,
  user,
  buttonText,
  handleAddToCart
}) => {
  const ticketCount = getObjectLength(tickets);

  return (
    <Fragment>
      <PageHeader pageId={getPageId()} dataTestId="tickets-page-header" />

      <SytledContainer fluid>
        <Grid stackable columns={2}>
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
                      user={user}
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
