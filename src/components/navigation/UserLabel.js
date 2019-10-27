import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Feed } from "semantic-ui-react";

import userImage from "../../images/userImage.png";

const StyledSpan = styled.span`
  color: #d4d4d5 !important;
  padding-right: 0.5rem;
`;

export const UserLabel = ({ username, currentMembership }) => {
  return (
    <Fragment>
      <StyledSpan as={Link} to="/user-profile">
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <img src={userImage} />
            </Feed.Label>
            <Feed.Content>
              {username.toUpperCase()} |
              {currentMembership.membership.type.toUpperCase()}
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </StyledSpan>
    </Fragment>
  );
};

export default UserLabel;
