import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { Message } from "semantic-ui-react";

const StyledSpan = styled.span`
  padding-right: 0.5rem;
`;

const StyledMessage = ({ redirect, linkText, message }) => {
  return (
    <Message>
      <StyledSpan>{message}</StyledSpan>
      <NavLink to={redirect}>{linkText}</NavLink>
    </Message>
  );
};

export default StyledMessage;
