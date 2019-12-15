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
import { emptyFunction, getViaMessage } from "../utils/appUtils";
import { alertUser } from "../actions";
import { getViaParam } from "../utils/urls";

export class PricingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTextFree: "Free Signup",
      buttonTextPro: "Add to cart",
      buttonDisabled: true,
      redirectParam: "",
      allAccess: "",
      showConfirmModal: false
    };
    this.handleSelectMembership = this.handleSelectMembership.bind(this);
    this.handleConfirmDownGrade = this.handleConfirmDownGrade.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembershipsList();
    const via = getViaParam();
    if (via) {
      const message = getViaMessage(via);
      this.props.alertUser(message);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      cart,
      userMembership,
      memberships,
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

    if (prevProps.memberships !== memberships) {
      if (memberships.dataReceived && isAuthenticated) {
        const allAccess = userMembership.is_pro_member;

        if (!allAccess) {
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

  handleConfirmDownGrade() {
    this.props.changeAccount(ACCOUNT_CHANGE_OPTION.downgrade);
    this.setState({ showConfirmModal: false });
  }

  handleCancel() {
    this.setState({ showConfirmModal: false });
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
          : this.setState({ showConfirmModal: true });
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
      this.props.alertUser("Lets signup first");
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
      redirectParam,
      showConfirmModal
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
        showConfirmModal={showConfirmModal}
        handleConfirmDownGrade={this.handleConfirmDownGrade}
        handleCancel={this.handleCancel}
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
  changeAccount,
  alertUser
})(withRouter(PricingContainer));
