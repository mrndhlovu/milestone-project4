import React, { Fragment } from "react";
import styled from "styled-components";

import {
  Form,
  Card,
  Divider,
  Button,
  Container,
  Message,
  Segment
} from "semantic-ui-react";

import { injectStripe, CardElement } from "react-stripe-elements";

const StyledContainer = styled(Container)`
  height: 300px important;
`;

const CardPaymentForm = ({
  handleOnFocus,
  handlePayNow,
  isDisabled,
  isLoading,
  stripeMessage,
  total
}) => {
  const { message, error } = stripeMessage;

  return (
    <Fragment>
      {error && (
        <Message negative>
          <Message.Header>Payment not successful!</Message.Header>
          <p>{message}</p>
        </Message>
      )}

      <Card fluid>
        <Card.Content>
          <Form.Group widths="equal">
            <StyledContainer>
              <Segment>
                <CardElement onFocus={() => handleOnFocus()} />
              </Segment>
            </StyledContainer>
          </Form.Group>
        </Card.Content>
        <Divider horizontal>Payment</Divider>
        <Segment>
          <Button
            onClick={() => handlePayNow()}
            color="orange"
            fluid
            loading={isLoading}
            disabled={isDisabled && !total}
            content={total ? `PAY  € ${total}` : "Pay Now"}
          />
        </Segment>
      </Card>
    </Fragment>
  );
};

export default injectStripe(CardPaymentForm);
