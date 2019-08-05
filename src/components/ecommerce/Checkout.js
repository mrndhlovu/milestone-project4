import React, { Component } from "react";

import styled from "styled-components";

import BillingInformation from "./BillingInformation";
import PaymentDetails from "./PaymentDetails";
import OrderSummary from "./OrderSummary";

import { Grid, Container } from "semantic-ui-react";

const StyledContainer = styled(Container)`
  padding-top: 1.5rem;
`;

export class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: ""
    };
  }
  render() {
    return (
      <StyledContainer>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <BillingInformation />
            </Grid.Column>

            <Grid.Column>
              <OrderSummary />
              <PaymentDetails />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyledContainer>
    );
  }
}

export default Checkout;
