import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { Card, List, Container } from "semantic-ui-react";

import {
  addToCart,
  getOrderDetail,
  deleteFromCart
} from "../actions/CheckoutActions";
import { getMembershipId, getOrderDesciption } from "../utils/appCheckoutUtils";
import {
  getMemberships,
  getCheckoutDetail,
  getCartAddOrRemove,
  getUser
} from "../selectors/appSelectors";
import CardButtons from "../components/ecommerce/CartButtons";
import CartItem from "../components/ecommerce/CartItem";
import { refresh, getCurrentMembership } from "../utils/appUtils";

export const StyledContainerWrapper = styled(Container)`
  padding-top: 1.5rem;
`;

export class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isOpen: false,
      showDeleteButton: false,
      cartItem: "",
      description: getOrderDesciption(),
      membershipId: getMembershipId()
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.cancelTranscation = this.cancelTranscation.bind(this);
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const id = cart ? cart.order.membershipId : 1;
    // const { isAuthenticated } = this.props.user;

    this.props.getOrderDetail(id);
    this.setState({
      description: getOrderDesciption(),
      cartItem: this.props.cartDetail.data
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartDetail !== this.props.cartDetail) {
      this.setState({ cartItem: this.props.cartDetail.data });
    }
  }

  cancelTranscation() {
    localStorage.setItem("selectedMembership", getCurrentMembership());
    localStorage.removeItem("cart");

    this.props.deleteFromCart();

    setTimeout(() => {
      refresh();
    }, 500);
  }

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleUpdate() {
    const { showDeleteButton } = this.state;
    this.setState({ showDeleteButton: !showDeleteButton });
  }

  render() {
    const {
      activeIndex,
      isOpen,
      showDeleteButton,
      description,
      cartItem
    } = this.state;

    const header = `Unicorn ${cartItem.slug} Account`;

    return (
      <div>
        <StyledContainerWrapper>
          <Card fluid>
            <Card.Content header="In Your Cart" />
            <Card.Content>
              <List divided relaxed>
                <CartItem
                  data={cartItem}
                  description={description}
                  header={header.toUpperCase()}
                  activeIndex={activeIndex}
                  isOpen={isOpen}
                  handleClick={this.handleClick}
                  showDeleteButton={showDeleteButton}
                  cancelTranscation={() => this.cancelTranscation}
                />
              </List>
            </Card.Content>
            <CardButtons handleUpdate={this.handleUpdate} />
          </Card>
        </StyledContainerWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberships: getMemberships(state),
    cartDetail: getCheckoutDetail(state),
    addorRemove: getCartAddOrRemove(state),
    user: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { addToCart, getOrderDetail, deleteFromCart }
)(CartContainer);
