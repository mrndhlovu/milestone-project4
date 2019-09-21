import React, { Fragment } from "react";

import { Label, Feed, Divider } from "semantic-ui-react";

import TicketsHeader from "./TicketsHeader";
import TicketsIcons from "./TicketsIcon";

export const Tickets = ({ ticketsList }) => {
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
      short_desc
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

        <Label.Group size="tiny">
          <Label>{tag}</Label>
        </Label.Group>
        <Divider />
      </Fragment>
    );
  });
};

export default Tickets;
