import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CardElement } from "react-stripe-elements";

import { Form, Card, Segment, Button } from "semantic-ui-react";

import { makePayment } from "../actions/CheckoutActions";
import { getCheckout } from "../selectors/appSelectors";

export class PaymentContainer extends Component {
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

  componentDidUpdate(prevProps) {
    const { checkout } = this.props;

    if (prevProps.checkout !== checkout) {
      if (checkout.dataReceived) {
        this.setState({ isLoading: false });
        setTimeout(() => {
          this.props.history.push("/user-profile");
        }, 1000);
      }
    }
  }

  handlePayNow() {
    this.setState({ isLoading: true, donateIsDisable: true });

    const { clickedSubmit, makePayment } = this.props;

    clickedSubmit();

    setTimeout(() => {
      return makePayment();
    }, 1000);
  }

  render() {
    const { isLoading, isDisabled } = this.state;
    return (
      <Card fluid>
        <Card.Content header="Payment" />
        <Card.Content>
          <Form.Group widths="equal">
            <Segment>
              <CardElement
                onFocus={() => this.setState({ isDisabled: false })}
              />
            </Segment>
          </Form.Group>
        </Card.Content>
        <Card.Content extra>
          <Button
            color="orange"
            fluid
            onClick={() => this.handlePayNow()}
            loading={isLoading}
            disabled={isDisabled}
          >
            PAY NOW
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkout: getCheckout(state)
  };
};

export default connect(
  mapStateToProps,
  { makePayment }
)(withRouter(PaymentContainer));
