import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { addItemToCart } from "../actions/CheckoutActions";
import { fetchMembershipsList } from "../actions/MembershipActions";
import {
  getMemberships,
  getUser,
  getCartPendingOrder,
  getUserProfile
} from "../selectors/appSelectors";
import HeadingImage from "../components/home/HeadingImage";
import MembershipOptions from "../components/ecommerce/MembershipOptions";
import { APP_TYPE, MEMBERSHIP_TYPE } from "../constants/constants";

export class MembershipContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTextFree: "Free Signup",
      buttonTextPro: "Add to cart",
      buttonDisabled: true,
      redirectParam: "",
      isProMember: ""
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembershipsList();
  }

  componentDidUpdate(prevProps) {
    const { cart, user } = this.props;

    if (prevProps.cart.data !== cart.data) {
      if (cart.data && Object.keys(cart.data.orders).length > 0) {
        const { orders } = cart.data;
        Object.keys(orders).forEach(order => {
          const cartItems = orders[order];
          if (cartItems.membership === MEMBERSHIP_TYPE.pro) {
            return this.setState({ buttonTextPro: "Item in your cart" });
          }
        });
      }
    }

    if (prevProps.user !== user) {
      if (user.data && user.data.username) {
        const isProMember =
          user.data.current_membership.membership.is_pro_member;

        this.setState({ isProMember });
        if (!isProMember) {
          this.setState({ buttonTextFree: "Your current membership" });
        }
      }
    }
  }

  handleAddToCart(id) {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      return this.props.addItemToCart(id, APP_TYPE.membership);
    }
    this.setState({ buttonTextPro: "Lets signup first" });
  }

  render() {
    const {
      memberships,
      auth: { isAuthenticated },
      history
    } = this.props;
    const {
      buttonTextFree,
      buttonTextPro,
      buttonDisabled,
      redirectParam,
      isProMember
    } = this.state;

    return (
      <Fragment>
        <HeadingImage />
        <MembershipOptions
          isAuthenticated={isAuthenticated}
          memberships={memberships}
          getMembershipChoice={this.renderServicesList}
          handleAddToCart={this.handleAddToCart}
          buttonTextFree={buttonTextFree}
          buttonTextPro={buttonTextPro}
          buttonDisabled={buttonDisabled}
          redirectParam={redirectParam}
          history={history}
          isProMember={isProMember}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: getUser(state),
    memberships: getMemberships(state),
    cart: getCartPendingOrder(state),
    user: getUserProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchMembershipsList, addItemToCart }
)(MembershipContainer);
