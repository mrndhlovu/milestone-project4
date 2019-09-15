import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Icon, Label } from "semantic-ui-react";

const StyledSpan = styled.span`
  color: green !important;
  padding-right: 0.5rem;
`;

export const UserLabel = ({ username, current_membership }) => {
  return (
    <Fragment>
      <StyledSpan as={Link} to="/user-profile">
        <Icon name="user" size="small" />
        {username}
      </StyledSpan>
      <StyledSpan as={Link} to="/pricing">
        <Label
          color={current_membership === "pro" ? "orange" : "teal"}
          size="tiny"
        >
          {current_membership.toUpperCase()}
        </Label>
      </StyledSpan>
    </Fragment>
  );
};

export default UserLabel;
