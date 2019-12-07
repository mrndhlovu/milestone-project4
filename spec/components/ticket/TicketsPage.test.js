import React from "react";
import { shallow } from "enzyme";

import { TableBody, Header, Button } from "semantic-ui-react";

import PageHeader from "../../../src/components/sharedComponents/PageHeader";
import { HEADER_TEXT } from "../../../src/constants/headerConstants";

import { findByDataTestId } from "../../testUtils.js/utils";
import TicketsList from "../../../src/components/tickets/TicketsList";
import Tickets from "../../../src/components/tickets/Tickets";
import ListSideBar from "../../../src/components/tickets/ListSideBar";

const DEFAULT_PROPS = {
  headerProps: {
    pageId: "tickets",
    dataTestId: "tickets-page-header",
    buttonId: "from-list-open-ticket"
  },
  ticketsProps: {
    tickets: [
      {
        id: 100,
        created_at: "2019-11-09T20:34:45.735479Z",
        updated_at: "2019-11-16T18:24:37.048132Z",
        title: "test 1",
        description: "test 1",
        is_feature: false
      },
      {
        id: 101,
        created_at: "2019-11-12T23:58:21.804539Z",
        updated_at: "2019-11-12T23:58:53.962334Z",
        title: "test 2",
        description: "test 2",
        is_feature: true
      }
    ],
    buttonText: "Add to cart",
    emptyTicketList: false
  }
};

describe("TicketsList", () => {
  let wrapper;
  let header;
  let container;
  let button;
  let tickets;
  let sidebar;

  function init() {
    wrapper = shallow(<TicketsList {...DEFAULT_PROPS.ticketsProps} />);
    tickets = shallow(
      <Tickets
        ticketsList={DEFAULT_PROPS.ticketsProps.tickets}
        handleAddToCart={DEFAULT_PROPS.ticketsProps.handleAddToCart}
      />
    );
    header = shallow(<PageHeader {...DEFAULT_PROPS.headerProps} />);
    sidebar = shallow(
      <ListSideBar data={DEFAULT_PROPS.ticketsProps.tickets} />
    );
  }

  beforeEach(() => {
    init();
  });

  it("should render ticket list page header", () => {
    container = findByDataTestId(header, "tickets-page-header");

    expect(container.length).toBe(1);
    expect(
      container
        .find(Header)
        .first()
        .props().content
    ).toEqual(HEADER_TEXT.tickets.headerText);
  });

  it("should render ticket grid container correctly ", () => {
    container = findByDataTestId(wrapper, "ticket-list-container");
    const grid = findByDataTestId(container, "ticket-grid-container");

    expect(container.length).toBe(1);
    expect(grid.props().children.length).toBe(2);
    expect(container).toContainMatchingElement(ListSideBar);
    expect(container).toContainMatchingElement(Tickets);
  });

  it("should render tickets list table correctly", () => {
    const newProps = {
      ticketsList: { ...DEFAULT_PROPS.ticketsProps.tickets },
      handleAddToCart: jasmine.createSpy("handleAddToCart"),
      isAuthenticated: true
    };
    wrapper = shallow(<Tickets {...newProps} />);
    container = findByDataTestId(wrapper, "ticket-list-table");
    const ticketHeader = findByDataTestId(container, "ticket-header-101");

    button = findByDataTestId(container, "add-ticket-to-cart-101");
    button.simulate("click");

    expect(newProps.handleAddToCart).toHaveBeenCalledWith(
      newProps.ticketsList[1].id
    );
    expect(container).toBeDefined();
    expect(container).toContainMatchingElement(TableBody);
    expect(ticketHeader.props().content).toBe("TEST 2");
  });
});
