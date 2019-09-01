import React, { Component } from "react";
import { connect } from "react-redux";

import { CardElement } from "react-stripe-elements";

import { Form, Button, Card, Segment } from "semantic-ui-react";

import {
  requestPayment,
  requestChoosenMembership
} from "../../actions/CheckoutActions";

export class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: "",
      isLoading: false,
      isDisabled: true
    };

    this.handleTextInput = this.handleTextInput.bind(this);
  }

  handleTextInput() {
    this.setState({ isDisabled: false });
  }

  componentDidMount() {
    this.props.requestChoosenMembership();
  }

  handleSubmit() {
    const { onSubmitClick, requestPayment } = this.props;

    onSubmitClick();
    requestPayment();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Card fluid>
        <Card.Content header="Payment" />
        <Card.Content>
          <Form.Group widths="equal">
            <Segment>
              <CardElement />
            </Segment>
          </Form.Group>
        </Card.Content>
        <Card.Content extra>
          <Button
            color="orange"
            fluid
            onClick={() => this.handleSubmit()}
            loading={isLoading}
          >
            PAY NOW
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { requestPayment, requestChoosenMembership }
)(PaymentDetails);
