import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";
import { Grid, Container, Header, Segment } from "semantic-ui-react";

import BillingInformation from "./BillingInformation";
import PaymentDetails from "./PaymentDetails";
import OrderSummary from "./OrderSummary";

import { submit } from "../../actions/CheckoutActions";

const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.clickedSubmit = this.clickedSubmit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
  }

  clickedSubmit() {
    console.log("USER CLICKED SUBMIT");
  }

  render() {
    return (
      <Fragment>
        <StyledContainer>
          <Header as="h3" block>
            Checkout
          </Header>
          <Segment>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <BillingInformation />
                </Grid.Column>
                <Grid.Column>
                  <OrderSummary />
                  <PaymentDetails onSubmitClick={this.clickedSubmit} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </StyledContainer>
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

export default connect(
  null,
  { submit }
)(StripeFormWrapper);
