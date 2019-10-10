import React from "react";

import { Card, Label, Grid } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import userImage from "../../images/userImage.png";

const UserProfileCard = ({ user, profile, handleCancelSubscription }) => {
  const { username, is_active, date_joined, bio } = user;
  const { created_at, next_billing, is_pro_member } = profile;
  return (
    <Grid stackable columns={2}>
      <Grid.Column width={4}>
        <Card
          image={userImage}
          meta={`Dated Joined: ${getFormatedDate(
            is_pro_member ? created_at : date_joined
          )}`}
          header={username.toUpperCase()}
          description={bio}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <Card
          header={`Account: Unicorn ${is_pro_member ? "PRO" : "FREE"}`}
          extra={`Status: ${is_active && "Online"}`}
          description={is_pro_member && `Next billing date: ${next_billing}`}
          fluid
        />

        <Label
          icon="globe"
          content="Cancel Subscription"
          floated="right"
          color="blue"
          as="a"
          onClick={() => handleCancelSubscription()}
        />
      </Grid.Column>
    </Grid>
  );
};

export default UserProfileCard;
