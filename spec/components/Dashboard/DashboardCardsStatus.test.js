import React from "react";
import { shallow } from "enzyme";
import { DashboardCardStatus } from "../../../src/components/dashboard/DashboardCardStatus";

import { Card } from "semantic-ui-react";

const DEFAULT_PROPS = {
  ticket: [
    {
      title: "A ticket",
      username: "username",
      short_desc: "short description",
      status: "todo",
      votes: 0,
      id: 1,
      image: null
    }
  ],
  cardType: "todo"
};

const mockWindowObject = pathname => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      pathname
    }
  });
};

describe("DashboardCardsStatus", () => {
  const wrapper = shallow(
    <DashboardCardStatus
      ticketList={DEFAULT_PROPS.ticket}
      cardType={DEFAULT_PROPS.cardType}
    />
  );
  let container;

  it("should load correctly", () => {
    container = wrapper.find('[data-test-id="card-status-todo-0"]').first();

    expect(container).toBeDefined();
  });

  it("should click on card header and redirect to ticket detail", () => {
    mockWindowObject("/ticket/1");
    let cardHeader = wrapper.find(Card.Header);

    cardHeader.simulate("click");
    expect(window.location.pathname).toMatch("/ticket/1");
  });
});
