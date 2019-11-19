import React from "react";

import { Button, Header, Grid, Card } from "semantic-ui-react";

import MembershipServiceList from "../../containers/MembershipServiceList";
import { MEMBERSHIP_TYPE } from "../../constants/constants";
import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../../constants/constants";

const proCard = { marginRight: 50, marginLeft: 10 };
const freeCard = { marginLeft: 50, marginRight: 10 };

export const Membership = ({
  membership,
  buttonText,
  isAuthenticated,
  handleAddToCart,
  history
}) => {
  const { price, id, slug } = membership;
  const isFreeMembership = slug === MEMBERSHIP_TYPE.free;

  const buttonColor = isFreeMembership ? "blue" : "black";
  const header = `Unicorn ${slug}`;

  return (
    <Grid.Column
      key={id}
      style={isFreeMembership ? { ...freeCard } : { ...proCard }}
    >
      <Card
        fluid
        data-test-id={isFreeMembership ? "free-membership" : "pro-membership"}
      >
        <Header
          as="h3"
          attached
          color={isFreeMembership ? "blue" : "black"}
          textAlign="center"
          content={header.toUpperCase()}
          subheader={
            isFreeMembership
              ? `€ ${price} Per / month`
              : `€ ${price} Per User / month`
          }
        />
        <MembershipServiceList
          listId={
            isFreeMembership
              ? "free-membership-description"
              : "pro-membership-description"
          }
          services={
            isFreeMembership ? UNICORN_FREE_SERVICES : UNICORN_PRO_SERVICES
          }
        />
        <Button
          data-test-id={isFreeMembership ? "free-signup-button" : "add-to-cart"}
          attached="bottom"
          disabled={isFreeMembership && isAuthenticated}
          content={buttonText.toUpperCase()}
          color={buttonColor}
          onClick={
            isFreeMembership
              ? () => history.push("/signup")
              : () => handleAddToCart(id)
          }
        />
      </Card>
    </Grid.Column>
  );
};

export default Membership;
