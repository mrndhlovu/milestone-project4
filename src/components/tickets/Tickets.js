import React, { Fragment } from "react";

import { Label, Feed, Divider, Button } from "semantic-ui-react";

import TicketsHeader from "./TicketsHeader";
import TicketsIcons from "./TicketsIcon";

export const Tickets = ({ ticketsList, handleAddToCart }) => {
  return ticketsList.map(ticket => {
    const {
      title,
      id,
      created_at,
      tag,
      views,
      votes,
      username,
      status,
      short_desc,
      price
    } = ticket;

    return (
      <Fragment key={id}>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <TicketsHeader
                title={title}
                created_at={created_at}
                username={username}
                id={id}
              />

              <Feed>{short_desc}</Feed>
            </Feed.Content>
            <TicketsIcons votes={votes} status={status} views={views} />
          </Feed.Event>
        </Feed>
        <Button
          floated="right"
          size="tiny"
          color="orange"
          onClick={() => handleAddToCart(id)}
        >
          Add to Cart
        </Button>
        <Label.Group size="tiny">
          <Label>{tag}</Label>
          <Label>${price}</Label>
        </Label.Group>

        <Divider />
      </Fragment>
    );
  });
};

export default Tickets;
