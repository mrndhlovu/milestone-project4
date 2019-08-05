import React, { Component } from "react";

import { PaymentMethod } from "../../constants/constants";

import { Form, Button, Card, Message } from "semantic-ui-react";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York."
].join(" ");

export class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: ""
    };
  }
  render() {
    const { hasError } = this.state;

    return (
      <Card fluid>
        <Card.Content header="Payment Details" />
        <Card.Content description={description}>
          <Form.Select
            fluid
            label="Payment Method"
            options={PaymentMethod}
            placeholder="Payment Method"
          />

          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-first-name"
            label="Card Number"
            placeholder="**** **** **** **** "
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              label="Expiration *"
              placeholder="MM / YY"
            />
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-last-name"
              label="CVC"
              placeholder="CVC"
            />
          </Form.Group>
          {hasError ? (
            <Message
              error
              header="Action Forbidden"
              content="You can only sign up for an account once with a given e-mail address."
            />
          ) : null}
        </Card.Content>
        <Card.Content extra>
          <Button color="orange" fluid>
            BUY NOW
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default PaymentDetail;
