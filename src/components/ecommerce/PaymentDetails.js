import React, { Component } from "react";

import { PaymentMethods } from "../../constants/constants";

import { CardElement } from "react-stripe-elements";

import { Form, Button, Card, Message, Segment } from "semantic-ui-react";

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
        <Segment>
          <CardElement />
        </Segment>
      </Form.Group>
    ) : null;
  }

  render() {
    const { hasError, paymentOption } = this.state;
    const { onSubmitClick } = this.props;

    return (
      <Card fluid>
        <Card.Content header="Payment Details" />
        <Card.Content>
          <Form.Select
            icon={paymentOption ? "stripe card" : "paypal card"}
            fluid
            label="Payment Method"
            options={PaymentMethods}
            placeholder="Select payment method"
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
          <Button color="orange" fluid onClick={onSubmitClick}>
            PAY NOW
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default PaymentDetails;
