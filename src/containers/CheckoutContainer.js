import React, { Component } from "react";

import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";
import { Grid, Container, Segment, Message } from "semantic-ui-react";
import OrderSummaryContainer from "./OrderSummaryContainer";

import PaymentContainer from "./PaymentContainer";
import BillingInformation from "../components/ecommerce/BillingInformation";

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
      <Segment style={{ marginTop: 40 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <BillingInformation />
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
      </Segment>
    );
  }
}

const FormInjection = injectStripe(CheckoutContainer);

const StripeFormWrapper = () => (
  <StripeProvider apiKey="pk_test_wbwSPsjAPpig1d7f4nP97LsX00zgMUqGbp">
    <Container>
      <Elements>
        <FormInjection />
      </Elements>
    </Container>
  </StripeProvider>
);

export default StripeFormWrapper;
