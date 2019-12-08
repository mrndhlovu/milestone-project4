import React from "react";

import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";

import PaymentContainer from "./PaymentContainer";

const CheckoutContainer = props => {
  const { stripe } = props;
  return <PaymentContainer stripe={stripe} />;
};

const FormInjection = injectStripe(CheckoutContainer);

const StripeFormWrapper = () => (
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}>
    <Elements>
      <FormInjection />
    </Elements>
  </StripeProvider>
);

export default StripeFormWrapper;
