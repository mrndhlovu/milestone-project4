import React from "react";

import {
  Form,
  Card,
  Segment,
  Button,
  Container,
  Message
} from "semantic-ui-react";

import { CardElement } from "react-stripe-elements";

const CardPaymentForm = ({
  handleOnFocus,
  handlePayNow,
  isDisabled,
  isLoading,
  stripeMessage
}) => {
  const { message, error } = stripeMessage;
  return (
    <Container style={{ borderRadius: 0 }}>
      {error && (
        <Message negative>
          <Message.Header>Payment not successful!</Message.Header>
          <p>{message}</p>
        </Message>
      )}
      <Segment>
        <Card fluid>
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
      </Segment>
    </Container>
  );
};

export default CardPaymentForm;
