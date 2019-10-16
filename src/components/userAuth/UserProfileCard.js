import React, { Fragment } from "react";

import { Card, Grid, Segment, Button } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import userImage from "../../images/userImage.png";
import UserPurchases from "./UserPurchases";

const UserProfileCard = ({ user, handleCancelSubscription }) => {
  const {
    username,
    current_membership: { membership }
  } = user;
  const { next_billing_date, is_pro_member } = membership;
  const PURCHASES = user.current_membership.purchases.tickets;

  return (
    <Grid stackable columns={2}>
      <Grid.Column width={4}>
        <Card
          image={userImage}
          meta={`Dated Joined: ${getFormatedDate(membership.date_signedup)}`}
          header={username.toUpperCase()}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <Card
          header={`Account: Unicorn ${
            membership.is_pro_member ? "PRO" : "FREE"
          }`}
          extra={`Subscription: ${
            is_pro_member ? "All accesss" : "Limited access"
          }`}
          description={
            is_pro_member &&
            `Next billing date: ${getFormatedDate(next_billing_date)}`
          }
          fluid
        />

        {PURCHASES.length > 0 && (
          <UserPurchases purchases={user.current_membership.purchases} />
        )}
        <Card>
          {is_pro_member ? (
            <Fragment>
              <Button
                floated="right"
                icon="globe"
                content="Cancel Subscription"
                floated="right"
                color="blue"
                as="a"
                onClick={() => handleCancelSubscription()}
              />
              <Button
                icon="globe"
                content="Deactivate account"
                floated="right"
                color="blue"
                as="a"
                onClick={() => handleCancelSubscription()}
              />
            </Fragment>
          ) : (
            <Button
              icon="globe"
              content="Deactivate account"
              floated="right"
              color="blue"
              as="a"
              onClick={() => handleCancelSubscription()}
            />
          )}
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default UserProfileCard;
