import React from "react";
import styled from "styled-components";

import Avatar from "react-avatar";

import { Feed } from "semantic-ui-react";
import UpgradeCtaButton from "../sharedComponents/UpgradeCtaButton";
import Cart from "./Cart";

const StyledDiv = styled.div`
  color: white;
  padding-left: ${props => props.mobile && "42px"};
  padding-top: ${props => !props.mobile && "10px"};
`;

const StyledUsernameSpan = styled.span`
  padding-right: 5px;
  color: ${props => (props.mobile ? "#2185d0" : "#f2711c")};
  text-decoration: uppercase;
`;

export const NavigationCTAs = ({
  mobile,
  username,
  allAccess,
  history,
  pendingOrders
}) => {
  const cartNotEmpty = pendingOrders > 0;

  return (
    <Feed>
      <Feed.Event>
        <StyledDiv mobile={mobile}>
          <Feed.Label>
            <StyledUsernameSpan>
              {!allAccess && <UpgradeCtaButton />}

              <Avatar
                onClick={() => history.push("/user-profile")}
                textSizeRatio={2}
                size="32"
                name={username}
                color={allAccess ? "red" : "purple"}
              />
            </StyledUsernameSpan>
            {cartNotEmpty && (
              <Cart pendingOrders={pendingOrders} history={history} />
            )}
          </Feed.Label>
        </StyledDiv>
      </Feed.Event>
    </Feed>
  );
};

export default NavigationCTAs;
