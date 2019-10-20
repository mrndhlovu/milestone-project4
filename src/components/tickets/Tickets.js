import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { Button, Grid, Card, Label, Segment } from "semantic-ui-react";

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
  const isProMember =
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
        price,
        is_bug
      } = ticketsList[key];

      return (
        <Grid.Column key={id}>
          <Segment style={{ marginBottom: 10 }}>
            <Label
              style={{ marginBottom: 5 }}
              as="a"
              color={is_bug ? "teal" : "orange"}
              ribbon="right"
            >
              {is_bug
                ? `${5 - votes} Bug votes to solution`
                : `Fix Now Price € ${price}`}
            </Label>
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
                  {username} | {getFormatedDate(created_at)}
                </Card.Meta>
              }
              color="black"
              component={short_desc}
              otherProps={
                <Card.Content extra>
                  <TicketsIcons votes={votes} status={status} views={views} />

                  <Button
                    disabled={!isProMember && is_bug}
                    floated="right"
                    size="tiny"
                    color="orange"
                    onClick={
                      is_bug ? () => handleVote(id) : () => handleAddToCart(id)
                    }
                  >
                    {!is_bug
                      ? buttonText
                      : isProMember
                      ? "Vote"
                      : "Upgrade to PRO to Vote"}
                  </Button>
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
