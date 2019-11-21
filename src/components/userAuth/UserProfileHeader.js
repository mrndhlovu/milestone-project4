import React from "react";
import styled from "styled-components";

import { Header, Segment } from "semantic-ui-react";
import { capitalizeFirstLetter } from "../../utils/appUtils";

const StyledSegment = styled(Segment)`
  padding-bottom: 5rem !important;
  background-image: url(${props => props.image}) !important;
`;

const UserProfileHeader = ({ mobile, userData, accountType }) => {
  const { first_name, username } = userData;
  const name = first_name ? first_name : username;

  return (
    <div>
      <StyledSegment
        textAlign="center"
        inverted
        vertical
        data-test-id="user-profile-header"
      >
        <Header
          as="h1"
          content={capitalizeFirstLetter(name)}
          inverted
          style={{
            fontSize: mobile ? "2em" : "3em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: mobile ? "1em" : "1em"
          }}
        />
        <Header
          as="h2"
          content={accountType}
          inverted
          style={{
            fontSize: mobile ? "1.5em" : "1.7em",
            fontWeight: "normal",
            marginTop: mobile ? "0.5em" : "1.5em"
          }}
        />
      </StyledSegment>
    </div>
  );
};

export default UserProfileHeader;
