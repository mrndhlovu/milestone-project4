import React from "react";
import { withRouter } from "react-router-dom";

import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../../constants/constants";
import { getCurrentMembership } from "../../utils/appUtils";
import { Button, Header, List, Segment } from "semantic-ui-react";

const MembershipOptions = ({
  memberships,
  membershipChoice,
  handleAddToCart,
  buttonTextPro,
  buttonTextFree,
  buttonDisabled,
  redirectParam,
  history
}) => {
  return memberships.map(membership => {
    const { price, id, slug } = membership;
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
                ? membershipChoice(UNICORN_FREE_SERVICES)
                : membershipChoice(UNICORN_PRO_SERVICES)}
            </List>
          </Segment>
        </div>
        <Button
          attached="bottom"
          disabled={slug === getCurrentMembership() && buttonDisabled}
          content={buttonText.toUpperCase()}
          color={buttonColor}
          onClick={
            redirectParam
              ? () => {
                  setTimeout(() => {
                    history.push(
                      getCurrentMembership() === "pro"
                        ? "/user-profile"
                        : redirectParam
                    );
                  }, 500);
                }
              : () => handleAddToCart(slug, id)
          }
        />
      </Segment>
    );
  });
};

export default withRouter(MembershipOptions);
