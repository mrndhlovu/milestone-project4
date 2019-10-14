import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { addItemToCart } from "../actions/CheckoutActions";
import { fetchMembershipsList } from "../actions/MembershipActions";
import {
  getMemberships,
  getUser,
  getMembershipProfile,
  getCartPendingOrder
} from "../selectors/appSelectors";
import HeadingImage from "../components/home/HeadingImage";
import MembershipOptions from "../components/ecommerce/MembershipOptions";

export class MembershipContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTextFree: "Free Signup",
      buttonTextPro: "Add to cart",
      buttonDisabled: true,
      redirectParam: ""
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembershipsList();
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;

    if (prevProps.cart.data !== cart.data) {
      if (cart.data && Object.keys(cart.data.orders).length > 0) {
        const { orders } = cart.data;
        Object.keys(orders).map(order => {
          const cartItems = orders[order];
          if (cartItems.membership === "pro") {
            return this.setState({ buttonTextPro: "Item in your cart" });
          }
        });
      }
    }
  }

  handleAddToCart(id) {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      return this.props.addItemToCart(id, "membership");
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
      redirectParam
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
    userMembership: getMembershipProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchMembershipsList, addItemToCart }
)(MembershipContainer);
