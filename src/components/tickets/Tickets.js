import React from "react";
import { Link } from "react-router-dom";

import { Button, Grid, Card, Label, Segment, Icon } from "semantic-ui-react";

import TicketsIcons from "./TicketsIcon";
import { getFormatedDate } from "../../utils/appUtils";
import DashboardCard from "../sharedComponents/DashboardCard";

export const Tickets = ({
  ticketsList,
  handleAddToCart,
  handleVote,
  user,
  buttonText
}) => {
  const allAccess =
    user.dataReceived && user.data.current_membership.membership.is_pro_member;

  const renderTicketCards = () => {
    return Object.keys(ticketsList).map(key => {
      const {
        title,
        id,
        created_at,
        views,
        votes,
        username,
        status,
        short_desc,
        is_bug,
        is_feature
      } = ticketsList[key];

      return (
        <Grid.Column key={id}>
          <Segment style={{ marginBottom: 10 }}>
            {is_bug && <Icon name="bug" color="red" />}
            {is_feature && <Icon name="circle" color="olive" />}
            <DashboardCard
              header={
                <Card.Header
                  as={Link}
                  to={`ticket/${id}`}
                  content={title.toUpperCase()}
                />
              }
              headerSize="h4"
              subheader={
                <Card.Meta style={{ fontSize: "0.8rem" }}>
                  opened by {username} | {getFormatedDate(created_at)}
                </Card.Meta>
              }
              color="black"
              component={short_desc}
              otherProps={
                <Card.Content extra>
                  <TicketsIcons votes={votes} status={status} views={views} />

                  {is_feature && (
                    <Button
                      disabled={!allAccess}
                      floated="right"
                      size="tiny"
                      color="orange"
                      onClick={() => handleAddToCart(id)}
                    >
                      {buttonText}
                    </Button>
                  )}
                </Card.Content>
              }
            />
          </Segment>
        </Grid.Column>
      );
    });
  };

  return (
    <Grid columns={3} stackable>
      <Grid.Row>{renderTicketCards()}</Grid.Row>
    </Grid>
  );
};

export default Tickets;
