import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import CartBody from "../../../src/components/ecommerce/CartBody";

const DEFAULT_PROPS = {
  orderItems: [{ donation: "testItem", price: "10.0", id: 2 }],
  handleRemoveClick: jasmine.createSpy("onClick")
};

describe("Cart body", () => {
  let wrapper;
  let container;

  function init() {
    wrapper = shallow(<CartBody {...DEFAULT_PROPS} />);
  }

  beforeEach(() => {
    init();
  });

  it("renders an order item correctly, click remove from cart button and pass the correct prop id and productType", () => {
    container = findByDataTestId(wrapper, "order-item-2");
    const button = findByDataTestId(wrapper, "order-item-2-button");
    button.props().onClick();

    expect(container.length).toBe(1);
    expect(DEFAULT_PROPS.handleRemoveClick).toHaveBeenCalledWith(
      DEFAULT_PROPS.orderItems[0].id,
      "donation"
    );
  });
});
