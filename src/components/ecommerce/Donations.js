import React from "react";
import { Card, Input } from "semantic-ui-react";

const Donations = ({ handleDonationInput, donateIsDisable, buttonText }) => {
  return (
    <Card.Content>
      <Input
        onChange={event => handleDonationInput(event)}
        disabled={donateIsDisable}
        fluid
        action={{
          color: "orange",
          labelPosition: "left",
          icon: "heart",
          content: `${buttonText}`
        }}
        actionPosition="left"
        placeholder="amount €"
      />
    </Card.Content>
  );
};

export default Donations;
