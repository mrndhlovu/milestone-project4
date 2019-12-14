import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Grid, Container } from "semantic-ui-react";

import { makePayment } from "../actions/CheckoutActions";
import {
  getCheckout,
  getCartPendingOrder,
  getUserName
} from "../selectors/appSelectors";
import CardPaymentForm from "../components/ecommerce/CardPaymentForm";
import OrderSummaryContainer from "./OrderSummaryContainer";
import PageHeader from "../components/sharedComponents/PageHeader";
import { getPageId } from "../utils/urls";

const StyledContainer = styled(Container)`
  padding-top: 20px;
  width: 100%;
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
    this.setState({ isDisabled: !this.state.isDisabled });
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
    const { pendingOrders, userName } = this.props;
    const orderCount = pendingOrders.data.count ? pendingOrders.data.count : 0;

    return (
      <Fragment>
        <PageHeader
          pageId={getPageId()}
          dataTestId="checkout-page-header"
          hideButton={true}
          userName={userName}
          orderCount={orderCount}
        />
        <StyledContainer>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={9}>
                <OrderSummaryContainer
                  pendingOrders={pendingOrders}
                  count={orderCount}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <CardPaymentForm
                  handleOnFocus={this.handleOnFocus}
                  handlePayNow={this.handlePayNow}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  stripeMessage={{ error, message }}
                  total={pendingOrders.data.total}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </StyledContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkout: getCheckout(state),
    pendingOrders: getCartPendingOrder(state),
    userName: getUserName(state.user)
  };
};

PaymentContainer.propTypes = {
  checkout: PropTypes.object.isRequired,
  makePayment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { makePayment })(
  withRouter(PaymentContainer)
);
