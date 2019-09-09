import React from "react";
import { NavLink } from "react-router-dom";

import {
  unicornFreeServices,
  unicornProServices
} from "../../constants/constants";

import { CURRENT_MEMBERSHIP } from "../../constants/localStorageConstants";

import { getSelectedMemberShip } from "../../utils/appUtils";

import { Button, Header, List, Segment } from "semantic-ui-react";

const handleOptionClick = membershipOption => {
  const membership = getSelectedMemberShip(membershipOption);

  localStorage.setItem("selectedMembership", `${membership}`);
};
const currentMembership = CURRENT_MEMBERSHIP ? CURRENT_MEMBERSHIP : "free";

export const MembershipOptions = ({
  memberships,
  isAuthenticated,
  membershipChoice
}) => {
  return memberships.map(membership => {
    const { price, id, slug } = membership;

    const buttonText =
      currentMembership === slug
        ? isAuthenticated
          ? "Your current membership"
          : "Free Signup"
        : isAuthenticated
        ? "Upgrade your membership"
        : "Unicorn Pro";
    const buttonColor = currentMembership === slug ? "blue" : "orange";
    const redirectUrl =
      currentMembership === slug
        ? isAuthenticated
          ? "/pricing"
          : "/signup"
        : "/cart";
    const header = `Unicorn ${slug}`;

    return (
      <Segment key={id}>
        <Header
          as="h2"
          attached="top"
          color={currentMembership === slug ? "blue" : "orange"}
          textAlign="center"
          content={header.toUpperCase()}
          subheader={
            currentMembership === slug
              ? `$ ${price} Per / month`
              : `$ ${price} Per User / month`
          }
        />

        <div>
          <Segment>
            <List>
              {CURRENT_MEMBERSHIP === slug
                ? membershipChoice(unicornFreeServices)
                : membershipChoice(unicornProServices)}
            </List>
          </Segment>
        </div>
        <Button
          attached="bottom"
          content={buttonText.toUpperCase()}
          as={NavLink}
          to={redirectUrl}
          color={buttonColor}
          onClick={() =>
            handleOptionClick(
              CURRENT_MEMBERSHIP === slug ? CURRENT_MEMBERSHIP : "pro",
              redirectUrl
            )
          }
        />
      </Segment>
    );
  });
};

export default MembershipOptions;
