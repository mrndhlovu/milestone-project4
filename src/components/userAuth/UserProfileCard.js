import React, { Fragment } from "react";

import { Card, Label } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import userImage from "../../images/userImage.png";

const UserProfileCard = ({ user, profile, handleCancelSubscription }) => {
  const { username, is_active, date_joined, bio } = user;
  const { created_at, next_billing, is_pro_member } = profile;
  return (
    <Fragment>
      <Card
        fluid
        image={userImage}
        meta={`Dated Joined: ${getFormatedDate(
          is_pro_member ? created_at : date_joined
        )}`}
        header={username}
        description={bio}
      />

      <Card
        fluid
        header={`Account Type: ${is_pro_member ? "Professional" : "Free"}`}
        extra={`Status: ${is_active && "Active"}`}
        description={is_pro_member && `Next billing date: ${next_billing}`}
      />

      <Label
        icon="globe"
        content="Cancel Subscription"
        floated="right"
        color="orange"
        as="a"
        onClick={() => handleCancelSubscription()}
      />
    </Fragment>
  );
};

export default UserProfileCard;
