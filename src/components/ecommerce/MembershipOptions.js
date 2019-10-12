import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Header, Grid, Card } from "semantic-ui-react";

import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../../constants/constants";
import { hasMembership } from "../../utils/appUtils";
import MembershipServiceList from "../../containers/MembershipServiceList";

const proCard = { marginRight: 50, marginLeft: 10 };
const freeCard = { marginLeft: 50, marginRight: 10 };

const MembershipOptions = ({
  memberships,
  handleAddToCart,
  buttonTextPro,
  buttonTextFree,
  history
}) => {
  const renderOptions = () => {
    return Object.keys(memberships).map(key => {
      const { price, id, slug } = memberships[key];
      const isNotProMember = slug !== "pro";
      const buttonText = isNotProMember ? buttonTextFree : buttonTextPro;
      const buttonColor = isNotProMember ? "blue" : "black";
      const header = `Unicorn ${slug}`;

      return (
        <Grid.Column
          key={id}
          style={isNotProMember ? { ...freeCard } : { ...proCard }}
        >
          <Card fluid style={{ borderRadius: 0 }}>
            <Header
              as="h3"
              attached
              color={isNotProMember ? "blue" : "black"}
              textAlign="center"
              content={header.toUpperCase()}
              subheader={
                isNotProMember
                  ? `€ ${price} Per / month`
                  : `€ ${price} Per User / month`
              }
            />

            {isNotProMember ? (
              <MembershipServiceList services={UNICORN_FREE_SERVICES} />
            ) : (
              <MembershipServiceList services={UNICORN_PRO_SERVICES} />
            )}

            <Button
              attached="bottom"
              disabled={hasMembership(slug)}
              content={buttonText.toUpperCase()}
              color={buttonColor}
              onClick={
                isNotProMember
                  ? () => history.push("/signup")
                  : () => handleAddToCart(id)
              }
            />
          </Card>
        </Grid.Column>
      );
    });
  };

  return (
    <Grid stackable columns="equal" style={{ paddingTop: 50 }}>
      <Grid.Row>{renderOptions()}</Grid.Row>
    </Grid>
  );
};

export default withRouter(MembershipOptions);
