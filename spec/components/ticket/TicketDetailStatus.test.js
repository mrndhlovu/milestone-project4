import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import TicketDetailStats from "../../../src/components/tickets/TicketDetailStats";

const DEFAULT_PROPS = {
  handleVoteClick: jasmine.createSpy("handleVoteClick"),
  allAccess: false,
  views: 0,
  votes: 2,
  id: 1
};

describe("TicketsList", () => {
  let wrapper;
  let container;
  let button;

  function init() {
    wrapper = shallow(<TicketDetailStats {...DEFAULT_PROPS} />);
    container = findByDataTestId(wrapper, "detail-stats");
  }

  beforeEach(() => {
    init();
  });

  it("should render ticket detail buttons and click on like button", () => {
    expect(container.length).toBe(1);

    button = findByDataTestId(container, "detail-like-button");
    button.props().onClick();

    expect(DEFAULT_PROPS.handleVoteClick).toHaveBeenCalledWith(
      DEFAULT_PROPS.id
    );
  });
});
