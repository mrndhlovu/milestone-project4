import React from "react";
import { Card, Grid, Button, Input, Header, Segment } from "semantic-ui-react";

import { DONATION_AMOUNTS } from "../../constants/constants";

const Donations = ({ handleAddToCart, handleDonationInput, buttonText }) => {
  const otherAmount = () => {
    return (
      <Card.Content style={{ paddingBottom: 10 }}>
        <Input
          onChange={event => handleDonationInput(event)}
          onBlur={() => handleAddToCart(DONATION_AMOUNTS.other)}
          fluid
          action={{
            color: "blue",
            labelPosition: "left",
            icon: "euro",
            content: `${buttonText}`
          }}
          placeholder="other amount"
        />
      </Card.Content>
    );
  };
  const renderDonationCards = () => {
    return Object.keys(DONATION_AMOUNTS).map(key => {
      return (
        <Grid.Column key={key} style={{ paddingBottom: 10 }}>
          <Button
            color="blue"
            fluid
            onClick={() => handleAddToCart("button", DONATION_AMOUNTS[key])}
          >
            € {DONATION_AMOUNTS[key]}
          </Button>
        </Grid.Column>
      );
    });
  };

  return (
    <Segment>
      <Header content="Donate" />

      <Grid columns={3}>
        <Grid.Row>{renderDonationCards()}</Grid.Row>
      </Grid>
      {otherAmount()}
    </Segment>
  );
};

export default Donations;
