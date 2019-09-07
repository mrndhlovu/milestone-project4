import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Header, Label, Feed, Divider, Icon } from "semantic-ui-react";

import { getFormatedDate } from "../../constants/constants";

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

export const Tickets = ({ ticketsList }) => {
  return ticketsList.map(ticket => {
    const {
      title,
      subject,
      id,
      created_at,
      slug,
      views,
      votes,
      username
    } = ticket;

    return (
      <Fragment key={id}>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Header as={Link} to={`/ticket/${id}`} size="small" color="blue">
                {title.toUpperCase()}
              </Header>
              <Feed.Summary>
                <StyledSpan> By:@{username.toLowerCase()} </StyledSpan>
              </Feed.Summary>
              <Feed.Date style={{ paddingTop: 10 }}>
                <StyledSpan>{getFormatedDate(created_at)}</StyledSpan>
              </Feed.Date>
              <Feed.Extra text>{subject}</Feed.Extra>
            </Feed.Content>
            <div floated="right">
              <Label color="teal">
                <Icon name="user" color="black" />
                Votes:{votes > 0 ? votes : 0}
              </Label>
              <Label color="teal">
                <Icon name="eye" color="black" />
                Views:{views > 0 ? views : 0}
              </Label>
            </div>
          </Feed.Event>
        </Feed>

        <Label.Group color="teal" size="tiny">
          <Label as="a">{slug}</Label>
        </Label.Group>
        <Divider />
      </Fragment>
    );
  });
};

export default Tickets;
