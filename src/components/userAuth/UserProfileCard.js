import React, { Fragment } from "react";

import { Card, Grid, Button, Label } from "semantic-ui-react";

import { getDate } from "../../utils/appUtils";
import userImage from "../../images/userImage.png";
import UserPurchases from "./UserPurchases";
import { DEFAULT_IMAGE } from "../../constants/constants";

const UserProfileCard = ({
  user,
  handleCancelButtonClick,
  handleUploadImage,
  image
}) => {
  const {
    username,
    current_membership: { membership }
  } = user;
  const { next_billing_date, is_pro_member } = membership;
  const PURCHASES = user.current_membership.purchases.tickets;
  const defaultImage = DEFAULT_IMAGE === image;

  return (
    <Grid stackable columns={2}>
      <Grid.Column width={4}>
        <Card
          fluid
          image={image ? image : userImage}
          header={username.toUpperCase()}
          extra={
            defaultImage && (
              <input type="file" onChange={event => handleUploadImage(event)} />
            )
          }
        />

        {is_pro_member ? (
          <Fragment>
            <p>
              <Button
                icon="delete"
                content="Deactivate account"
                fluid
                color="blue"
                as="a"
                onClick={() => handleCancelButtonClick("deactivate")}
              />
            </p>
            <p>
              <Button
                fluid
                icon="globe"
                content="Cancel Subscription"
                color="blue"
                as="a"
                onClick={() => handleCancelButtonClick("downgrade")}
              />
            </p>
          </Fragment>
        ) : (
          <Button
            icon="globe"
            content="Deactivate account"
            floated="right"
            color="blue"
            as="a"
            fluid
            onClick={() => handleCancelButtonClick("deactivate")}
          />
        )}
      </Grid.Column>
      <Grid.Column width={12}>
        <Card
          header={`Account: Unicorn ${
            membership.is_pro_member ? "PRO" : "FREE"
          }`}
          extra={`Permission: ${
            is_pro_member ? "All access" : "Limited access"
          }`}
          description={
            is_pro_member && `Next billing date: ${getDate(next_billing_date)}`
          }
          fluid
        />

        {PURCHASES.length > 0 && (
          <UserPurchases
            allAccess={is_pro_member}
            purchases={user.current_membership.purchases}
            accountType={`Unicorn ${
              membership.is_pro_member ? "PRO" : "FREE"
            } membership`}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default UserProfileCard;
