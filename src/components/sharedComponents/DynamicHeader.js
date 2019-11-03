import React from "react";

import styled from "styled-components";

import { Header, Segment } from "semantic-ui-react";

const StyledSegment = styled(Segment)`
  background-image: url(${props => props.image}) !important;
  height: 35vh;
`;

const StyledHeader = styled(Header)`
  font-size: 3em !important;
  font-weight: 100 !important;
  padding-top: 4rem !important;
`;

const DynamicHeader = ({ image, articleTitle }) => {
  return (
    <StyledSegment textAlign="center" inverted vertical image={image}>
      <StyledHeader as="h1" inverted>
        {articleTitle.toUpperCase()}
      </StyledHeader>
    </StyledSegment>
  );
};

export default DynamicHeader;
