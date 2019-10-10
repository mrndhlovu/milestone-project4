import React from "react";
import { withRouter } from "react-router-dom";

import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../../constants/constants";
import { hasMembership } from "../../utils/appUtils";
import { Button, Header, List, Segment, Grid, Card } from "semantic-ui-react";

const proCard = { marginRight: 50, marginLeft: 30 };
const freeCard = { marginLeft: 50, marginRight: 30 };

const MembershipOptions = ({
  memberships,
  getMembershipChoice,
  handleAddToCart,
  buttonTextPro,
  buttonTextFree,
  redirectParam,
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
                  ? `$ ${price} Per / month`
                  : `$ ${price} Per User / month`
              }
            />

            <List style={{ paddingLeft: 20 }}>
              {isNotProMember
                ? getMembershipChoice(UNICORN_FREE_SERVICES)
                : getMembershipChoice(UNICORN_PRO_SERVICES)}
            </List>

            <Button
              attached="bottom"
              disabled={hasMembership(slug)}
              content={buttonText.toUpperCase()}
              color={buttonColor}
              onClick={
                redirectParam
                  ? () => {
                      history.push(
                        hasMembership("pro") ? "/user-profile" : redirectParam
                      );
                    }
                  : () => handleAddToCart(id, "membership")
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
