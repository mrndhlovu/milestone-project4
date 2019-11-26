import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import TicketSolution from "../../../src/components/tickets/TicketSolution";

const DEFAULT_PROPS = {
  activeIndex: 0,
  index: 0,
  handleAccordionClick: jasmine.createSpy("handleAccordionClick"),
  addToCart: jasmine.createSpy("addToCart"),
  solution: {},
  id: 1,
  buttonText: "Test button",
  isAuthenticated: false
};

describe("TicketsList", () => {
  let wrapper;
  let container;
  let button;

  function init() {
    wrapper = shallow(<TicketSolution {...DEFAULT_PROPS} />);
    container = findByDataTestId(wrapper, "ticket-solution-container");
  }

  beforeEach(() => {
    init();
  });

  it("should render ticket solution component and click on add to cart", () => {
    expect(container.length).toBe(1);

    button = findByDataTestId(container, "ticket-solution-add-to-cart");
    button.props().onClick();

    expect(DEFAULT_PROPS.addToCart).toHaveBeenCalled();
  });

  it("should click on add to cart button with id argument passed", () => {
    const newProps = { ...DEFAULT_PROPS, isAuthenticated: true };
    wrapper = shallow(<TicketSolution {...newProps} />);
    container = findByDataTestId(wrapper, "ticket-solution-container");

    button = findByDataTestId(container, "ticket-solution-add-to-cart");
    button.props().onClick();

    expect(DEFAULT_PROPS.addToCart).toHaveBeenCalledWith(DEFAULT_PROPS.id);
  });
});
