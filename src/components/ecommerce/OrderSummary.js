import React, { Component } from "react";

import { Card, Input, List, Button } from "semantic-ui-react";

export class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemPrice: "",
      itemName: "",
      itemDesription: "",
      showCouponInput: "",
      defaultCouponButtonText: true
    };
    this.handleHasCouponClick = this.handleHasCouponClick.bind(this);
    this.renderCouponInput = this.renderCouponInput.bind(this);
  }

  handleHasCouponClick(buttonText) {
    buttonText === "Have a coupon? Click here to enter your code"
      ? this.setState({
          showCouponInput: true,
          defaultCouponButtonText: !this.state.defaultCouponButtonText
        })
      : this.setState({
          showCouponInput: false,
          defaultCouponButtonText: true
        });
  }

  renderCouponInput() {
    const { showCouponInput } = this.state;
    return showCouponInput ? (
      <Card.Content>
        <Input
          action={{
            color: "grey",
            labelPosition: "left",
            icon: "cart",
            content: "Apply Discount"
          }}
          actionPosition="left"
          placeholder="e.g: DISCOUNT10"
        />
      </Card.Content>
    ) : null;
  }
  renderCartItem() {
    const { itemPrice, itemDesription, itemName } = this.state;
    return (
      <Card.Content>
        <Card.Header content={`Order Item Name: ${itemName}`} />
        <Card.Meta content={`Order Item:  ${itemDesription}`} />
        <Card.Description content={`Price: ${itemPrice}`} />
      </Card.Content>
    );
  }

  render() {
    const { showCouponInput, defaultCouponButtonText } = this.state;
    const buttonText = defaultCouponButtonText
      ? "Have a coupon? Click here to enter your code"
      : "Dont have coupon";
    return (
      <div>
        <Card fluid>
          <Card.Content header="Order Summary" />
          {this.renderCartItem()}

          <List.Content>
            <Button basic onClick={() => this.handleHasCouponClick(buttonText)}>
              {buttonText}
            </Button>
          </List.Content>

          {showCouponInput ? this.renderCouponInput() : null}
        </Card>
      </div>
    );
  }
}

export default OrderSummary;
