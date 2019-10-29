import React, { Component } from "react";
import styled from "styled-components";

import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";

import { Grid, Message } from "semantic-ui-react";

import OrderSummaryContainer from "./OrderSummaryContainer";
import PaymentContainer from "./PaymentContainer";

const StyledDiv = styled.div`
  width: 100%;
  padding: 20px 10%;
`;

class CheckoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: "",
      isLoading: false
    };
    this.clickedSubmit = this.clickedSubmit.bind(this);
  }

  clickedSubmit() {
    const { stripe } = this.props;
    stripe &&
      stripe.createToken().then(result => {
        if (result.error) {
          this.setState({
            error: true,
            isLoading: false,
            message: result.error.message
          });
        } else {
          localStorage.setItem("stripeToken", result.token.id);
        }
      });
  }

  render() {
    const { error, message } = this.state;
    return (
      <StyledDiv>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <OrderSummaryContainer />
            </Grid.Column>
            <Grid.Column width={7}>
              {error && (
                <Message negative>
                  <Message.Header>Payment not successful!</Message.Header>
                  <p>{message}</p>
                </Message>
              )}
              <PaymentContainer clickedSubmit={this.clickedSubmit} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyledDiv>
    );
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
