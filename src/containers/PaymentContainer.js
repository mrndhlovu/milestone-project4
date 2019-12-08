import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Grid } from "semantic-ui-react";

import { makePayment } from "../actions/CheckoutActions";
import { getCheckout } from "../selectors/appSelectors";
import CardPaymentForm from "../components/ecommerce/CardPaymentForm";
import OrderSummaryContainer from "./OrderSummaryContainer";

const StyledDiv = styled.div`
  width: 100%;
  padding: 20px 15px;
`;

export class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: "",
      isLoading: false,
      isDisabled: true,
      error: false,
      message: ""
    };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handlePayNow = this.handlePayNow.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { checkout } = this.props;

    if (prevProps.checkout !== checkout) {
      if (checkout.dataReceived) {
        this.setState({ isLoading: false });
        setTimeout(() => {
          this.props.history.push("/user-profile");
        }, 1000);
      }
      if (checkout.hasError) {
        this.setState({ isLoading: false });
      }
    }
  }

  handleTextInput() {
    this.setState({ isDisabled: false });
  }

  handleOnFocus() {
    this.setState({ isDisabled: false });
  }

  handlePayNow() {
    this.setState({ isLoading: true });
    const { stripe } = this.props;

    stripe.createToken().then(result => {
      if (result.error) {
        this.setState({
          error: true,
          isLoading: false,
          message: result.error.message
        });
      } else {
        const { id } = result.token;
        this.props.makePayment(id);
      }
    });
  }

  render() {
    const { isLoading, isDisabled, error, message } = this.state;

    return (
      <StyledDiv>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <OrderSummaryContainer />
            </Grid.Column>
            <Grid.Column width={7}>
              <CardPaymentForm
                handleOnFocus={this.handleOnFocus}
                handlePayNow={this.handlePayNow}
                isDisabled={isDisabled}
                isLoading={isLoading}
                stripeMessage={{ error, message }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkout: getCheckout(state)
  };
};

PaymentContainer.propTypes = {
  checkout: PropTypes.object.isRequired,
  makePayment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { makePayment })(
  withRouter(PaymentContainer)
);
