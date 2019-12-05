import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { makePayment } from "../actions/CheckoutActions";
import { getCheckout } from "../selectors/appSelectors";
import CardPaymentForm from "../components/ecommerce/CardPaymentForm";

export class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentOption: "",
      isLoading: false,
      isDisabled: true,
      activeIndex: 0
    };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handlePayNow = this.handlePayNow.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  handleTextInput() {
    this.setState({ isDisabled: false });
  }

  handleOnFocus() {
    this.setState({ isDisabled: false });
  }
  handleAccordionClick(index) {
    const { activeIndex } = this.state;
    if (index === activeIndex) {
      this.setState({ activeIndex: 2 });
    } else {
      this.setState({ activeIndex: index });
    }
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
    }
  }

  handlePayNow() {
    this.setState({ isLoading: true });

    const { clickedSubmit, makePayment } = this.props;

    clickedSubmit();

    setTimeout(() => {
      return makePayment();
    }, 1000);
  }

  render() {
    const { isLoading, isDisabled, activeIndex } = this.state;
    return (
      <CardPaymentForm
        handleOnFocus={this.handleOnFocus}
        handlePayNow={this.handlePayNow}
        isDisabled={isDisabled}
        isLoading={isLoading}
        activeIndex={activeIndex}
        handleAccordionClick={this.handleAccordionClick}
      />
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
