import React, { Component } from "react";

import { Card, Input, List, Button } from "semantic-ui-react";

export class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemPrice: "",
      itemName: "",
      itemDesription: "",
      showCouponInput: ""
    };
    this.handleHasCouponClick = this.handleHasCouponClick.bind(this);
    this.renderCouponInput = this.renderCouponInput.bind(this);
  }

  handleHasCouponClick() {
    this.setState({ showCouponInput: true });
  }

  renderCouponInput() {
    return (
      <Card.Content>
        <Input
          action={{
            color: "teal",
            labelPosition: "left",
            icon: "cart",
            content: "Coupon number"
          }}
          actionPosition="left"
          placeholder="e.g: DISCOUNT10"
        />
      </Card.Content>
    );
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
    const { showCouponInput } = this.state;
    return (
      <div>
        <Card fluid>
          <Card.Content header="Order Summary" />
          <Card.Content>{this.renderCartItem()}</Card.Content>

          <Card.Content extra>
            <List.Content>
              Have a coupon?
              <Button
                content="Standard"
                basic
                onClick={this.handleHasCouponClick}
              >
                Click here to enter your code.
              </Button>
            </List.Content>
          </Card.Content>
          {showCouponInput ? this.renderCouponInput() : null}
        </Card>
      </div>
    );
  }
}

export default OrderSummary;
