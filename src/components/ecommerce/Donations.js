import React from "react";
import styled from "styled-components";

import { Button, Input, Header, Segment } from "semantic-ui-react";

import { DONATION_AMOUNTS } from "../../constants/constants";

const StyledDiv = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const Donations = ({ handleAddToCart, handleDonationInput, buttonText }) => {
  const otherAmount = () => {
    return (
      <Segment vertical data-test-id="donation-other-amount">
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
      </Segment>
    );
  };
  const renderDonationButtons = () => {
    return Object.keys(DONATION_AMOUNTS).map(key => {
      return (
        <Segment vertical key={key}>
          <Button
            data-test-id={`donation-amount-${DONATION_AMOUNTS[key]}`}
            color="blue"
            fluid
            onClick={() => handleAddToCart("button", DONATION_AMOUNTS[key])}
          >
            € {DONATION_AMOUNTS[key]}
          </Button>
        </Segment>
      );
    });
  };

  return (
    <StyledDiv data-test-id="donations-buttons-container">
      <Segment>
        <Header content="Donate" data-test-id="donations-header" />
        <div data-test-id="donations-buttons-wrapper">
          {renderDonationButtons()}
        </div>
        {otherAmount()}
      </Segment>
    </StyledDiv>
  );
};

export default Donations;
