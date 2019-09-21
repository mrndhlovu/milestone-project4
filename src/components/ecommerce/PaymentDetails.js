import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CardElement } from "react-stripe-elements";

import { Form, Button, Card, Segment } from "semantic-ui-react";

import { requestPayment, addToCart } from "../../actions/CheckoutActions";
import { getCheckout } from "../../selectors/appSelectors";

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
    this.props.addToCart();
  }

  componentDidUpdate(prevProps) {
    const { checkout } = this.props;
    if (prevProps.checkout !== checkout) {
      this.setState({ isLoading: false });
      this.props.history.push("/user-profile");
    }
  }

  handlePayNow() {
    this.setState({ isLoading: true });
    const { payNowClick, requestPayment } = this.props;

    payNowClick();

    setTimeout(function() {
      requestPayment();
    }, 1000);
  }

  render() {
    const { isLoading, isDisabled } = this.state;
    console.log(this.props);
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
  { requestPayment, addToCart }
)(withRouter(PaymentDetails));
