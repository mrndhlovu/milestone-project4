import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const StyledSpan = styled.span`
  color: #b3daf7 !important;
  padding-right: 0.5rem;
`;

export const UserLabel = ({ username, current_membership }) => {
  return (
    <Fragment>
      <StyledSpan as={Link} to="/user-profile">
        <Icon name="user" size="small" />
        {username}
      </StyledSpan>
    </Fragment>
  );
};

export default UserLabel;
