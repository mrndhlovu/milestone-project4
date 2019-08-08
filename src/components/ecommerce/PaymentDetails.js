import React, { Component } from "react";

import { PaymentMethods } from "../../constants/Constants";

import { Form, Button, Card, Message } from "semantic-ui-react";

export class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: ""
    };

    this.handlePaymentOption = this.handlePaymentOption.bind(this);
  }

  handlePaymentOption(event, methods) {
    const paymentOption = event.target.innerText;

    methods.map(method => {
      return paymentOption === method.text
        ? this.setState({ paymentOption: method.text })
        : null;
    });
  }

  renderPaymentMethod() {
    const { paymentOption } = this.state;
    return paymentOption === "Stripe" ? (
      <Form.Group widths="equal">
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-first-name"
          label="Card Number *"
          placeholder="**** **** **** **** "
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-first-name"
          label="Expiration *"
          placeholder="MM / YY"
        />
        <Form.Input
          fluid
          id="form-subcomponent-shorthand-input-last-name"
          label="CVC *"
          placeholder="CVC"
        />
      </Form.Group>
    ) : null;
  }

  render() {
    const { hasError, paymentOption } = this.state;

    return (
      <Card fluid>
        <Card.Content header="Payment Details" />
        <Card.Content>
          <Form.Select
            icon={paymentOption ? "stripe card" : "paypal card"}
            fluid
            label="Payment Method"
            options={PaymentMethods}
            placeholder="Payment Method"
            onChange={event => this.handlePaymentOption(event, PaymentMethods)}
          />

          {paymentOption ? this.renderPaymentMethod() : null}
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

export default PaymentDetails;
