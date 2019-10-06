import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

import { CardElement } from "react-stripe-elements";

import { Form, Button, Card, Segment } from "semantic-ui-react";

import { makePayment } from "../actions/CheckoutActions";
import { getCheckout } from "../selectors/appSelectors";

const StyledButton = styled(Button)`
  border-radius: 0 !important;
`;

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
      this.setState({ isLoading: false });
      this.props.history.push("/user-profile");
    }
  }

  handlePayNow(option) {
    this.setState({ isLoading: true });
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
          <StyledButton
            color="orange"
            fluid
            onClick={() => this.handlePayNow()}
            // loading={isLoading}
            disabled={isDisabled}
          >
            PAY NOW
          </StyledButton>
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
