import React, { Component } from "react";

import { Card } from "semantic-ui-react";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York."
].join(" ");

export class OrderSummary extends Component {
  render() {
    return (
      <div>
        <Card fluid>
          <Card.Content header="Order Summary" />
          <Card.Content description={description} />
          <Card.Content extra>
            Have a coupon? Click here to enter your code.
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default OrderSummary;
