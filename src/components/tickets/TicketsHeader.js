import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Header, Feed } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";

const StyledSpan = styled.span`
  font-size: 0.8rem;
`;

const TicketsHeader = ({ username, created_at, id, title }) => {
  return (
    <Fragment>
      <Header as={Link} to={`/ticket/${id}`} size="small" color="black">
        {title.toUpperCase()}
      </Header>
      <Feed.Summary>
        <StyledSpan> {username.toLowerCase()} </StyledSpan>
      </Feed.Summary>
      <Feed.Date style={{ paddingTop: 10 }}>
        <StyledSpan>{getFormatedDate(created_at)}</StyledSpan>
      </Feed.Date>
    </Fragment>
  );
};

export default TicketsHeader;
