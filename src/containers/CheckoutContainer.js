import React, { Component } from "react";

import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";

import PaymentContainer from "./PaymentContainer";

class CheckoutContainer extends Component {
  render() {
    const { stripe } = this.props;
    return <PaymentContainer stripe={stripe} />;
  }
}

const FormInjection = injectStripe(CheckoutContainer);

const StripeFormWrapper = () => (
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}>
    <Elements>
      <FormInjection />
    </Elements>
  </StripeProvider>
);

export default StripeFormWrapper;
