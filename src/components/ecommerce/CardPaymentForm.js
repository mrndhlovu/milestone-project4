import React from "react";

import { Form, Card, Segment, Button } from "semantic-ui-react";

import { CardElement } from "react-stripe-elements";

const CardPaymentForm = ({
  handleOnFocus,
  handlePayNow,
  isDisabled,
  isLoading
}) => {
  return (
    <Card fluid>
      <Card.Content header="Payment" />
      <Card.Content>
        <Form.Group widths="equal">
          <Segment>
            <CardElement onFocus={() => handleOnFocus()} />
          </Segment>
        </Form.Group>
      </Card.Content>
      <Card.Content extra>
        <Button
          color="orange"
          fluid
          onClick={() => handlePayNow()}
          loading={isLoading}
          disabled={isDisabled}
        >
          PAY NOW
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CardPaymentForm;
