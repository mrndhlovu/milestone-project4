import React from "react";
import { withRouter } from "react-router-dom";

import { Button, Header, Grid, Card } from "semantic-ui-react";

import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES,
  MEMBERSHIP_TYPE
} from "../../constants/constants";

import MembershipServiceList from "../../containers/MembershipServiceList";
import PageHeader from "../sharedComponents/PageHeader";
import { getPageId } from "../../utils/urls";

const proCard = { marginRight: 50, marginLeft: 10 };
const freeCard = { marginLeft: 50, marginRight: 10 };

const MembershipOptions = ({
  memberships,
  handleAddToCart,
  buttonTextPro,
  buttonTextFree,
  history,
  isAuthenticated
}) => {
  const renderOptions = () => {
    return Object.keys(memberships).map(key => {
      const { price, id, slug } = memberships[key];
      const FREE = slug === MEMBERSHIP_TYPE.free;

      const buttonText = FREE ? buttonTextFree : buttonTextPro;
      const buttonColor = FREE ? "blue" : "black";
      const header = `Unicorn ${slug}`;

      return (
        <Grid.Column key={id} style={FREE ? { ...freeCard } : { ...proCard }}>
          <Card fluid>
            <Header
              as="h3"
              attached
              color={FREE ? "blue" : "black"}
              textAlign="center"
              content={header.toUpperCase()}
              subheader={
                FREE ? `€ ${price} Per / month` : `€ ${price} Per User / month`
              }
            />

            {FREE && <MembershipServiceList services={UNICORN_FREE_SERVICES} />}
            {!FREE && <MembershipServiceList services={UNICORN_PRO_SERVICES} />}

            <Button
              attached="bottom"
              disabled={FREE && isAuthenticated}
              content={buttonText.toUpperCase()}
              color={buttonColor}
              onClick={
                FREE ? () => history.push("/signup") : () => handleAddToCart(id)
              }
            />
          </Card>
        </Grid.Column>
      );
    });
  };

  return (
    <div data-test-id="pricing-page">
      <PageHeader pageId={getPageId()} buttonId="file-ticket" />

      <Grid stackable columns="equal" style={{ paddingTop: 50 }}>
        <Grid.Row>{renderOptions()}</Grid.Row>
      </Grid>
    </div>
  );
};

export default withRouter(MembershipOptions);
