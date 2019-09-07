import React from "react";
import { NavLink } from "react-router-dom";

import {
  unicornFreeServices,
  unicornProServices
} from "../../constants/constants";

import { Button, Grid, Header, List, Segment } from "semantic-ui-react";

export const MembershipOptions = ({
  memberships,
  isAuthenticated,
  membershipChoice
}) => {
  const type = "free";

  return memberships.map(membership => {
    const { price, id, slug } = membership;

    const buttonText =
      type === slug
        ? isAuthenticated
          ? "Your current membership"
          : "Free Signup"
        : isAuthenticated
        ? "Upgrade your membership"
        : "Unicorn Pro";
    const buttonColor = type === slug ? "black" : "orange";
    const redirectUrl =
      type === slug ? (isAuthenticated ? "/pricing" : "/signup") : "/cart";
    const header = type === slug ? `Unicorn ${slug}` : `Unicorn ${slug}`;

    return (
      <Grid.Column style={{ padding: "5em 5em 5em 1em" }} key={id}>
        <Header
          as="h2"
          attached="top"
          color={type === slug ? "black" : "purple"}
          textAlign="center"
          content={header.toUpperCase()}
          subheader={
            type === slug
              ? `$ ${price} Per / month`
              : `$ ${price} Per User / month`
          }
        />

        <div>
          <Segment>
            <List>
              {type === slug
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
        />
      </Grid.Column>
    );
  });
};

export default MembershipOptions;
