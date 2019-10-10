import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { List, Icon, Grid } from "semantic-ui-react";

import { addItemToCart } from "../actions/CheckoutActions";
import { fetchMembershipsList } from "../actions/MembershipActions";
import { getCurrentMembership, itemInCart } from "../utils/appUtils";
import { getMemberships, getUser } from "../selectors/appSelectors";
import { getRedirectParam } from "../utils/urls";

import HeadingImage from "../components/home/HeadingImage";
import MembershipOptions from "../components/ecommerce/MembershipOptions";

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

  handleAddToCart(id, productId) {
    const { isAuthenticated } = this.props.authUser;
    this.props.addItemToCart(id, productId);

    const redirectParam = getRedirectParam(productId);

    if (redirectParam === "/checkout" && isAuthenticated) {
      this.setState({
        redirectParam: isAuthenticated ? redirectParam : "/signup",
        buttonTextPro: "Proceed to checkout",
        buttonTextFree: "Add to cart"
      });
    } else {
      this.setState({
        redirectParam: isAuthenticated ? redirectParam : "/signup",
        buttonTextFree:
          getCurrentMembership() !== "pro"
            ? "Proceed to signup"
            : "See your profile",
        buttonTextPro: "Add to cart"
      });
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
        buttonTextFree: itemInCart() ? "Item in" : "Down-grade to Unicorn Free",
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
    memberships: getMemberships(state),
    authUser: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchMembershipsList, addItemToCart }
)(MembershipContainer);
