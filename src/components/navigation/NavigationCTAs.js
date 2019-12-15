import React from "react";
import styled from "styled-components";

import Avatar from "react-avatar";

import { Feed, Label } from "semantic-ui-react";
import UpgradeCtaButton from "../sharedComponents/UpgradeCtaButton";
import Cart from "./Cart";

const StyledDiv = styled.div`
  position: ${props => props.mobile && "absolute"};
  right: 0;
  margin-top: ${props => (props.mobile ? "21px" : "-6px")};
  margin-right: 15px;
`;

const StyledUsernameSpan = styled.span`
  color: ${props => (props.mobile ? "#2185d0" : "#f2711c")};
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
            <StyledUsernameSpan mobile={mobile}></StyledUsernameSpan>
            {cartNotEmpty && (
              <Cart
                pendingOrders={pendingOrders}
                history={history}
                mobile={mobile}
              />
            )}
            {!allAccess && mobile && <UpgradeCtaButton mobile={mobile} />}
            <Label
              as="a"
              size="small"
              circular
              color={allAccess ? "blue" : "purple"}
            >
              <Avatar
                onClick={() => history.push("/user-profile")}
                textSizeRatio={2}
                size="30"
                name={username}
                color={allAccess ? "#2185d0" : "#a333c8"}
              />
            </Label>
          </Feed.Label>
        </StyledDiv>
      </Feed.Event>
    </Feed>
  );
};

export default NavigationCTAs;
