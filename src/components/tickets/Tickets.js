import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Card, Label, Segment } from "semantic-ui-react";

import TicketsIcons from "./TicketsIcon";
import { getFormatedDate } from "../../utils/appUtils";

export const Tickets = ({ ticketsList, handleAddToCart, handleVote, user }) => {
  const isProMember =
    user.dataReceived && user.current_membership.membership.is_pro_member;

  const renderList = () => {
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
          <Segment stacked>
            <Label
              style={{ marginTop: 10 }}
              as="a"
              color={is_bug ? "teal" : "orange"}
              ribbon="right"
            >
              {is_bug
                ? `${5 - votes} Bug votes to solution`
                : `Fix Now Price € ${price}`}
            </Label>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Card.Header as={Link} to={`ticket/${id}`}>
                    {title.toUpperCase()}
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      {username} | {getFormatedDate(created_at)}
                    </span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content description={short_desc} />
                <Card.Content extra>
                  <TicketsIcons votes={votes} status={status} views={views} />
                </Card.Content>
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
                    ? "Add to cart"
                    : !isProMember
                    ? "Upgrade to PRO to Vote"
                    : "Vote"}
                </Button>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      );
    });
  };

  return (
    <Grid columns={3}>
      <Grid.Row>{renderList()}</Grid.Row>
    </Grid>
  );
};

export default Tickets;
