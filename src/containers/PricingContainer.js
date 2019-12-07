import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { addItemToCart } from "../actions/CheckoutActions";
import {
  fetchMembershipsList,
  changeAccount
} from "../actions/MembershipActions";
import {
  getMemberships,
  getUser,
  getCartPendingOrder,
  getUserProfile,
  getUserMembership
} from "../selectors/appSelectors";

import MembershipOptions from "../components/ecommerce/MembershipOptions";
import {
  APP_TYPE,
  MEMBERSHIP_TYPE,
  ACCOUNT_CHANGE_OPTION
} from "../constants/constants";
import UILoadingSpinner from "../components/sharedComponents/UILoadingSpinner";
import { emptyFunction } from "../utils/appUtils";

export class PricingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTextFree: "Free Signup",
      buttonTextPro: "Add to cart",
      buttonDisabled: true,
      redirectParam: "",
      allAccess: ""
    };
    this.handleSelectMembership = this.handleSelectMembership.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembershipsList();
  }

  componentDidUpdate(prevProps) {
    const {
      cart,
      user,
      userMembership,

      auth: { isAuthenticated }
    } = this.props;

    if (prevProps.cart.data !== cart.data) {
      if (cart.data && Object.keys(cart.data.orders).length > 0) {
        const { orders } = cart.data;
        Object.keys(orders).forEach(order => {
          const cartItems = orders[order];
          if (cartItems.membership === MEMBERSHIP_TYPE.pro) {
            return this.setState({
              buttonTextPro: "Item in your cart: got to checkout"
            });
          }
        });
      }
    }

    if (prevProps.user !== user) {
      if (user.data && user.data.username) {
        const allAccess = userMembership.is_pro_member;

        if (!allAccess && isAuthenticated) {
          this.setState({
            buttonTextFree: "Your current membership",
            buttonTextPro: `Upgrade to an allAccess Account`
          });
        } else {
          this.setState({
            buttonTextFree: "Downgrade to a limited account",
            buttonTextPro: "Your current membership"
          });
        }
      }
    }
  }

  handleSelectMembership(id) {
    const {
      auth: { isAuthenticated },
      userMembership
    } = this.props;

    if (isAuthenticated) {
      if (typeof id === "string") {
        return !userMembership.is_pro_member
          ? emptyFunction
          : this.props.changeAccount(ACCOUNT_CHANGE_OPTION.downgrade);
      } else {
        if (userMembership.is_pro_member) {
          return this.setState({
            buttonTextPro: "You already on this subscription"
          });
        } else {
          return this.props.addItemToCart(id, APP_TYPE.membership);
        }
      }
    } else {
      this.setState({ buttonTextPro: "Lets signup first" });
    }
  }

  render() {
    const {
      memberships,
      auth: { isAuthenticated },
      history,
      userMembership
    } = this.props;
    const {
      buttonTextFree,
      buttonTextPro,
      buttonDisabled,
      redirectParam
    } = this.state;

    return memberships.dataReceived ? (
      <MembershipOptions
        isAuthenticated={isAuthenticated}
        memberships={memberships.data}
        getMembershipChoice={this.renderServicesList}
        handleSelectMembership={this.handleSelectMembership}
        buttonTextFree={buttonTextFree}
        buttonTextPro={buttonTextPro}
        buttonDisabled={buttonDisabled}
        redirectParam={redirectParam}
        history={history}
        allAccess={userMembership.is_pro_member}
      />
    ) : (
      <UILoadingSpinner />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getUser(state),
    memberships: getMemberships(state),
    cart: getCartPendingOrder(state),
    user: getUserProfile(state),
    userMembership: getUserMembership(state)
  };
};

PricingContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  memberships: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  fetchMembershipsList: PropTypes.func.isRequired,
  changeAccount: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  fetchMembershipsList,
  addItemToCart,
  changeAccount
})(withRouter(PricingContainer));
