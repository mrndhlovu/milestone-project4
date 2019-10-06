import React from "react";
import { withRouter } from "react-router-dom";

import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../../constants/constants";
import { hasMembership } from "../../utils/appUtils";
import { Button, Header, List, Segment } from "semantic-ui-react";

const MembershipOptions = ({
  memberships,
  getMembershipChoice,
  handleAddToCart,
  buttonTextPro,
  buttonTextFree,
  redirectParam,
  history
}) => {
  return Object.keys(memberships).map(key => {
    const { price, id, slug } = memberships[key];
    const isNotProMember = slug !== "pro";
    const buttonText = isNotProMember ? buttonTextFree : buttonTextPro;
    const buttonColor = isNotProMember ? "blue" : "orange";
    const header = `Unicorn ${slug}`;

    return (
      <Segment key={id}>
        <Header
          as="h2"
          attached="top"
          color={isNotProMember ? "blue" : "orange"}
          textAlign="center"
          content={header.toUpperCase()}
          subheader={
            isNotProMember
              ? `$ ${price} Per / month`
              : `$ ${price} Per User / month`
          }
        />

        <div>
          <Segment>
            <List>
              {isNotProMember
                ? getMembershipChoice(UNICORN_FREE_SERVICES)
                : getMembershipChoice(UNICORN_PRO_SERVICES)}
            </List>
          </Segment>
        </div>
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
      </Segment>
    );
  });
};

export default withRouter(MembershipOptions);
