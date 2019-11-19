import React from "react";
import { shallow } from "enzyme";
import DashboardCards from "../../../src/components/dashboard/DashboardCards";

import { Card } from "semantic-ui-react";
import { findByDataTestId } from "../../testUtils.js/utils";

const DEFAULT_PROPS = {
  headers: ["Backlog", "Up Next", "In Progress", "Closed"]
};

describe("DashboardCards", () => {
  const wrapper = shallow(<DashboardCards />);
  let container;

  it("should load correctly", () => {
    container = findByDataTestId(wrapper, "statistic-cards-container").first();
    expect(container).toBeDefined();
  });

  it("should render four dashboard segments with correct header", () => {
    container = wrapper.find(Card.Group);
    const cards = container.props().children;
    Object.keys(cards).forEach(key => {
      const { header } = cards[key].props;
      expect(header).toEqual(DEFAULT_PROPS.headers[key]);
    });
    expect(cards.length).toBe(4);
  });
});
