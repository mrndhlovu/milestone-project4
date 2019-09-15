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
import { getMemberships, getCheckoutDetail } from "../selectors/appSelectors";
import CardButtons from "../components/ecommerce/CartButtons";
import CartItem from "../components/ecommerce/CartItem";

export const StyledContainerWrapper = styled(Container)`
  padding-top: 1.5rem;
`;

export class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0.0,
      activeIndex: 0,
      isOpen: false,
      showDeleteButton: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.cancelTranscation = this.cancelTranscation.bind(this);
  }

  componentDidMount() {
    const id = getMembershipId();
    console.log(id);

    if (id !== null) {
      this.props.getOrderDetail(id);
    }
  }

  cancelTranscation() {
    this.props.deleteFromCart();
  }

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleUpdate() {
    const { showDeleteButton } = this.state;
    this.setState({ showDeleteButton: !showDeleteButton });
  }

  componentWillUpdate(prevProps) {
    const { checkOut } = this.props.cart;
    if (prevProps.checkOut !== checkOut) {
      console.log(checkOut);
    }
  }

  render() {
    const { price, slug } = this.props.cart.data;
    const { activeIndex, isOpen, showDeleteButton } = this.state;
    const header = `Unicorn ${slug} Account`;

    return (
      <div>
        <StyledContainerWrapper>
          <Card fluid>
            <Card.Content header="In Your Cart" />
            <Card.Content>
              <List divided relaxed>
                <CartItem
                  total={price}
                  description={getOrderDesciption(slug)}
                  header={header.toUpperCase()}
                  activeIndex={activeIndex}
                  isOpen={isOpen}
                  handleClick={this.handleClick}
                  showDeleteButton={showDeleteButton}
                  cancelTranscation={this.cancelTranscation}
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
    cart: getCheckoutDetail(state)
  };
};

export default connect(
  mapStateToProps,
  { addToCart, getOrderDetail, deleteFromCart }
)(CartContainer);
