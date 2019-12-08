import React, { Fragment } from "react";
import styled from "styled-components";

import {
  Form,
  Card,
  Divider,
  Button,
  Container,
  Message
} from "semantic-ui-react";

import { CardElement } from "react-stripe-elements";
import BillingDetails from "./BillingDetails";

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
              <CardElement onFocus={() => handleOnFocus()} />
            </StyledContainer>
          </Form.Group>
        </Card.Content>
        <Divider horizontal>Payment Details</Divider>
        <BillingDetails />
        <Button
          color="orange"
          fluid
          onClick={() => handlePayNow()}
          loading={isLoading}
          disabled={isDisabled}
          content={total ? `PAY  € ${total}` : "Pay Now"}
        />
      </Card>
    </Fragment>
  );
};

export default CardPaymentForm;
