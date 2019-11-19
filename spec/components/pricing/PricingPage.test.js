import React from "react";
import { shallow } from "enzyme";

import { Header, Button } from "semantic-ui-react";

import PageHeader from "../../../src/components/sharedComponents/PageHeader";
import { HEADER_TEXT } from "../../../src/constants/headerConstants";

import MembershipServiceList from "../../../src/containers/MembershipServiceList";
import Membership from "../../../src/components/ecommerce/Membership";

import MembershipOptions from "../../../src/components/ecommerce/MembershipOptions";

import {
  findByDataTestId,
  mockWindowObject,
  emptyFunction
} from "../../testUtils.js/utils";
import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../../../src/constants/constants";

const DEFAULT_PROPS = {
  headerProps: { ...HEADER_TEXT.pricing },
  pageHeader: {
    pageId: "pricing",
    dataTestId: "file-ticket"
  },
  membershipProps: {
    memberships: [
      { id: 1, slug: "free", membership_type: "free", price: 0 },
      { id: 1, slug: "pro", membership_type: "pro", price: 10 }
    ],
    buttonText: "button text",
    history: { push: jasmine.createSpy("onClick") },
    isAuthenticated: false,
    handleAddToCart: jasmine.createSpy("onClick")
  }
};

describe("PricingContainer", () => {
  let membership;
  let membershipOptions;
  let description;
  let header;
  let container;
  let button;

  function getMemberShip(option) {
    const freeMembership = option === "free";

    membership = shallow(
      <Membership
        handleAddToCart={DEFAULT_PROPS.membershipProps.handleAddToCart}
        history={DEFAULT_PROPS.membershipProps.history}
        membership={
          freeMembership
            ? DEFAULT_PROPS.membershipProps.memberships[0]
            : DEFAULT_PROPS.membershipProps.memberships[1]
        }
        buttonText={freeMembership ? "free sign up" : "add to cart"}
      />
    );
    description = shallow(
      <MembershipServiceList
        listId={
          freeMembership
            ? "free-membership-description"
            : "pro-membership-description"
        }
        services={freeMembership ? UNICORN_FREE_SERVICES : UNICORN_PRO_SERVICES}
      />
    );

    return membership;
  }

  function init() {
    membershipOptions = shallow(
      <MembershipOptions {...DEFAULT_PROPS.membershipProps} />
    );

    header = shallow(<PageHeader {...DEFAULT_PROPS.pageHeader} />);
  }

  beforeEach(() => {
    init();
  });

  it("renders membership options correctly", () => {
    container = findByDataTestId(membershipOptions, "membership-options");
    const memberships = findByDataTestId(
      container,
      "membership-grid-container"
    ).props().children;

    expect(container.length).toBe(1);
    expect(memberships.length).toBe(2);
    expect(container).toContainMatchingElement(Membership);
  });

  it("renders free membership card and description", () => {
    membership = getMemberShip("free");

    const container = findByDataTestId(membership, "free-membership");
    description = findByDataTestId(description, "free-membership-description");

    expect(container.length).toBe(1);
    expect(membership).toContainMatchingElement(MembershipServiceList);
    expect(description.length).toEqual(UNICORN_FREE_SERVICES.length);
  });

  it("should render pro membership card and description", () => {
    membership = getMemberShip();

    const container = findByDataTestId(membership, "pro-membership");
    description = findByDataTestId(description, "pro-membership-description");

    expect(container.length).toBe(1);
    expect(membership).toContainMatchingElement(MembershipServiceList);
    expect(description.length).toEqual(UNICORN_PRO_SERVICES.length);
  });

  it("should pricing page header", () => {
    container = findByDataTestId(header, "file-ticket");
    const h1Header = container
      .find(Header)
      .first()
      .props().content;

    expect(container).toBeDefined();
    expect(h1Header).toEqual(HEADER_TEXT.pricing.headerText);
  });

  it("should click on free signup button", () => {
    membership = getMemberShip("free");
    button = findByDataTestId(membership, "free-signup-button");

    button.simulate("click");
    expect(DEFAULT_PROPS.membershipProps.history.push).toHaveBeenCalled();
  });

  it("should click pro membership button", () => {
    membership = getMemberShip();
    button = findByDataTestId(membership, "add-to-cart");

    button.simulate("click");
    expect(DEFAULT_PROPS.membershipProps.handleAddToCart).toHaveBeenCalled();
  });
});
