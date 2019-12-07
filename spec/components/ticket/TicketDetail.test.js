import React from "react";
import { shallow } from "enzyme";

import { Header } from "semantic-ui-react";

import { findByDataTestId } from "../../testUtils.js/utils";
import TicketDetail from "../../../src/components/tickets/TicketDetail";
import DynamicHeader from "../../../src/components/sharedComponents/DynamicHeader";
import TicketDetailStats from "../../../src/components/tickets/TicketDetailStats";
import TicketSolution from "../../../src/components/tickets/TicketSolution";
import CommentsContainer from "../../../src/containers/CommentsContainer";
import Notification from "../../../src/components/sharedComponents/Notification";
import EditButtons from "../../../src/components/sharedComponents/EditButtons";

const DEFAULT_PROPS = {
  pageHeader: {
    title: "Test header",
    image: ""
  },
  props: {
    data: {
      data: {
        title: "Test header",
        description: " test description",
        views: 0,
        id: 1,
        image: "image",
        votes: 0,
        activeIndex: 0,
        created_at: "2019-12-05T21:06:33.022Z"
      },
      buttonText: "button text",
      history: { push: jasmine.createSpy("onClick") },
      isAuthenticated: false,
      addToCart: jasmine.createSpy("onClick"),
      handleAccordionClick: jasmine.createSpy("onClick"),
      owner: "admin",
      isOwner: false,
      comments: {}
    },
    user: { id: 1 }
  }
};

describe("Ticket Detail", () => {
  let wrapper;
  let container;
  let header;

  function init() {
    wrapper = shallow(<TicketDetail {...DEFAULT_PROPS.props} />);
    header = shallow(<DynamicHeader {...DEFAULT_PROPS.pageHeader} />);

    container = findByDataTestId(wrapper, "ticket-detail-container");
  }

  beforeEach(() => {
    init();
  });

  it("should render ticket detail header in dynamic header", () => {
    expect(wrapper).toContainMatchingElement(DynamicHeader);
    container = findByDataTestId(header, "article-title");

    expect(container.props().children.props.children).toBe(
      DEFAULT_PROPS.props.data.data.title.toUpperCase()
    );
  });

  it("should render ticket detail container correctly with the right content", () => {
    expect(container.length).toBe(1);
    expect(container).toContainMatchingElement(TicketDetailStats);
    expect(container).toContainMatchingElement(TicketSolution);
    expect(container).toContainMatchingElement(Notification);
  });

  it("should render protected components", () => {
    const newProps = { ...DEFAULT_PROPS.props, allAccess: true };
    wrapper = shallow(<TicketDetail {...newProps} />);
    container = findByDataTestId(wrapper, "ticket-detail-container");

    expect(container).toContainMatchingElement(CommentsContainer);
    expect(container).toContainMatchingElement(EditButtons);
  });
});
