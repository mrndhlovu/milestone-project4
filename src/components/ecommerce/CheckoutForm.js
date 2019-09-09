import React, { Component, Fragment } from "react";

import styled from "styled-components";

import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";
import { Grid, Container, Header, Segment, Message } from "semantic-ui-react";

import PaymentDetails from "./PaymentDetails";
import OrderSummary from "./OrderSummary";

const StyledContainerWrapper = styled(Container)`
  padding-top: 1.5rem;
`;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: "",
      isLoading: false
    };
    this.clickedSubmit = this.clickedSubmit.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   const { token } = this.state;
  //   if (prevProps.token !== token) {
  //   }
  // }

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
    const { isLoading, error, message } = this.state;
    return (
      <Fragment>
        <StyledContainerWrapper>
          <Header as="h3" block textAlign="center">
            Checkout
          </Header>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
                  {error && (
                    <Message negative>
                      <Message.Header>Payment not successful!</Message.Header>
                      <p>{message}</p>
                    </Message>
                  )}

                  <OrderSummary />
                  <PaymentDetails
                    payNowClick={this.clickedSubmit}
                    data={this.props}
                    loading={isLoading}
                    error={error}
                  />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </StyledContainerWrapper>
      </Fragment>
    );
  }
}

const FormInjection = injectStripe(CheckoutForm);

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
