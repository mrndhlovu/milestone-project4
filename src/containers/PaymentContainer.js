import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styled from "styled-components";

import { CardElement } from "react-stripe-elements";

import { Form, Button, Card, Segment } from "semantic-ui-react";

import { makePayment, donate } from "../actions/CheckoutActions";
import { getCheckout, getDonations } from "../selectors/appSelectors";
import Donations from "../components/ecommerce/Donations";

const StyledButton = styled(Button)`
  border-radius: 0 !important;
`;

export class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: "",
      isLoading: false,
      isDisabled: true,
      donateIsDisable: false,
      buttonText: "Enter donation amount",
      donation: ""
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDonationInput = this.handleDonationInput.bind(this);
  }

  handleTextInput() {
    this.setState({ isDisabled: false });
  }

  handleDonationInput(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ donation: e.target.value });
    }
  }

  componentDidUpdate(prevProps) {
    const { checkout, donations } = this.props;

    if (prevProps.checkout !== checkout || prevProps.donations !== donations) {
      if (checkout.dataReceived || donations.dataReceived) {
        this.setState({ isLoading: false });
        setTimeout(() => {
          this.props.history.push("/user-profile");
        }, 1000);
      }
    }
  }

  handlePayNow() {
    const { donation } = this.state;
    this.setState({ isLoading: true, donateIsDisable: true });

    const { clickedSubmit, makePayment } = this.props;

    clickedSubmit();

    setTimeout(() => {
      if (donation !== "") {
        return this.props.donate(donation);
      }
      return makePayment();
    }, 1000);
  }

  render() {
    const { isLoading, isDisabled, donateIsDisable, buttonText } = this.state;
    return (
      <Card fluid>
        <Card.Content header="Donations" />
        <Donations
          handleDonationInput={this.handleDonationInput}
          handlePayNow={this.handlePayNow}
          donateIsDisable={donateIsDisable}
          buttonText={buttonText}
        />

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
            loading={isLoading}
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
    checkout: getCheckout(state),
    donations: getDonations(state)
  };
};

export default connect(
  mapStateToProps,
  { makePayment, donate }
)(withRouter(PaymentContainer));
