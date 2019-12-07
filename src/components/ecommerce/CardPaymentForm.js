import React from "react";

import { Form, Card, Segment, Button, Container } from "semantic-ui-react";

import { CardElement } from "react-stripe-elements";

const CardPaymentForm = ({
  handleOnFocus,
  handlePayNow,
  isDisabled,
  isLoading
}) => {
  return (
    <Container style={{ borderRadius: 0 }}>
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
