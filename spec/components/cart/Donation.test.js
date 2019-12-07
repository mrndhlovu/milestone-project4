import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import Donations from "../../../src/components/ecommerce/Donations";
import { Header } from "semantic-ui-react";
import { DONATION_AMOUNTS } from "../../../src/constants/constants";

const DEFAULT_PROPS = {
  handleAddToCart: jasmine.createSpy("handleAddToCart"),
  handleDonationInput: jasmine.createSpy("handleDonationInput"),
  buttonText: "Add to cart"
};

describe("Donations", () => {
  let wrapper;
  let container;
  let button;

  function init() {
    wrapper = shallow(<Donations {...DEFAULT_PROPS} />);
  }

  beforeEach(() => {
    init();
  });

  it("should render donation buttons and click on each expecting the correct amount to be called", () => {
    container = findByDataTestId(wrapper, "donations-buttons-container");
    const header = findByDataTestId(container, "donations-header");
    const buttonsContainer = findByDataTestId(
      container,
      "donations-buttons-wrapper"
    );

    expect(header.props().content).toBe("Donate");
    expect(buttonsContainer.props().children.length).toBe(4);

    Object.keys(DONATION_AMOUNTS).map(key => {
      button = findByDataTestId(
        container,
        `donation-amount-${DONATION_AMOUNTS[key]}`
      );

      button.props().onClick();
      expect(DEFAULT_PROPS.handleAddToCart).toHaveBeenCalledWith(
        "button",
        DONATION_AMOUNTS[key]
      );
    });
  });
});
