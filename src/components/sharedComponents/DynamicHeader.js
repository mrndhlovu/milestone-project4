import React from "react";
import styled from "styled-components";

import { Header, Segment } from "semantic-ui-react";

const StyledSegment = styled(Segment)`
  background-image: url(${props => props.image}) !important;
  height: 250px;

  opacity: ${props => props.image && 0.9};
`;

const StyledHeader = styled(Header)`
  font-size: 3em !important;
  font-weight: 100 !important;
  padding-top: 4rem !important;
`;

const StyledSpan = styled.span`
  background-color: #000;
  opacity: 0.8;
  padding: 5px 10px;
  border-radius: 5px;
`;

const DynamicHeader = ({ image, title, dataTestId }) => {
  return (
    <StyledSegment
      textAlign="center"
      inverted
      vertical
      image={image}
      data-test-id={dataTestId}
    >
      <StyledHeader as="h1" inverted data-test-id="article-title">
        <StyledSpan>{title.toUpperCase()}</StyledSpan>
      </StyledHeader>
    </StyledSegment>
  );
};

export default DynamicHeader;
