import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import TicketSolution from "../../../src/components/tickets/TicketSolution";
import Notification from "../../../src/components/sharedComponents/Notification";

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

const notificationProps = {
  linkText: "Add to Cart",
  message: "Ticket solution requires payment",
  redirect: jasmine.createSpy("addToCart"),
  iconName: "content",
  dataTestId: "ticket-solution-add-to-cart"
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
    const wrapper = shallow(<Notification {...notificationProps} />);
    container = findByDataTestId(wrapper, "notification-modal-container");

    button = findByDataTestId(container, "ticket-solution-add-to-cart");
    button.props().onClick();

    expect(notificationProps.redirect).toHaveBeenCalled();
  });

  it("should click on add to cart button when authenticated", () => {
    const newProps = {
      ...notificationProps,
      redirect:
        { ...DEFAULT_PROPS.isAuthenticated, isAuthenticated: true } &&
        jasmine.createSpy("addToCart")
    };

    wrapper = shallow(<Notification {...newProps} />);
    container = findByDataTestId(wrapper, "notification-modal-container");

    button = findByDataTestId(container, "ticket-solution-add-to-cart");
    button.props().onClick();

    expect(newProps.redirect).toHaveBeenCalledWith();
  });
});
