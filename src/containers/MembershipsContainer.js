import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import HeadingImage from "../components/home/HeadingImage";
import { getMemberships, getUser } from "../selectors/appSelectors";

import { List, Icon } from "semantic-ui-react";

import { fetchMembershipsList } from "../actions/MembershipActions";
import { addToCart } from "../actions/CheckoutActions";
import MembershipOptions from "../components/ecommerce/MembershipOptions";
import { getCurrentMembership, isItemInCart } from "../utils/appUtils";
import { getRedirectParam } from "../utils/urls";
import GridLayout from "./GridLayout";

export class MembershipContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTextFree: "",
      buttonTextPro: "",
      buttonDisabled: true,
      redirectParam: ""
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  renderServicesList(services) {
    return services.map((service, index) => {
      return (
        <List.Item as="a" key={index}>
          <Icon name="check" />
          <List.Content>
            <List.Description>{service}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  handleAddToCart(membership, id) {
    const { isAuthenticated } = this.props.authUser;
    localStorage.setItem("selectedMembership", `${membership}`);
    const redirectParam = getRedirectParam(membership);

    const cartData = { membership, order: { membershipId: id } };

    if (redirectParam === "/cart") {
      this.setState({
        redirectParam: isAuthenticated ? redirectParam : "/signup",
        buttonTextPro: "Proceed to checkout",
        buttonTextFree: "Add to cart"
      });
      localStorage.setItem("cart", JSON.stringify(cartData));

      if (isAuthenticated) {
        this.props.addToCart();
      }
    } else {
      this.setState({
        redirectParam: isAuthenticated ? redirectParam : "/signup",
        buttonTextFree:
          getCurrentMembership() !== "pro"
            ? "Proceed to signup"
            : "See your profile",
        buttonTextPro: "Add to cart"
      });

      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }

  componentDidMount() {
    this.props.fetchMembershipsList();
    if (getCurrentMembership() === "guest" || undefined) {
      this.setState({
        buttonTextFree: "Add to Cart",
        buttonTextPro: "Add to Cart"
      });
    } else if (getCurrentMembership() === "free") {
      this.setState({
        buttonTextFree: "Your Current Membership",
        buttonTextPro: "Upgrade to Unicorn Pro"
      });
    } else {
      this.setState({
        buttonTextFree: isItemInCart()
          ? "Item in"
          : "Down-grade to Unicorn Free",
        buttonTextPro: "Your Current Membership"
      });
    }
  }

  render() {
    const {
      memberships,
      authUser: { isAuthenticated },
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
        <GridLayout>
          <MembershipOptions
            isAuthenticated={isAuthenticated}
            memberships={memberships}
            membershipChoice={this.renderServicesList}
            handleAddToCart={this.handleAddToCart}
            buttonTextFree={buttonTextFree}
            buttonTextPro={buttonTextPro}
            buttonDisabled={buttonDisabled}
            redirectParam={redirectParam}
            history={history}
          />
        </GridLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberships: getMemberships(state),
    authUser: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchMembershipsList, addToCart }
)(MembershipContainer);
