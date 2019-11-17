import React from "react";
import { shallow } from "enzyme";

import { HEADER_TEXT } from "../../src/constants/headerConstants";
import WelcomePage from "../../src/components/WelcomePage";
import PageHeader from "../../src/components/sharedComponents/PageHeader";
import { Header, List } from "semantic-ui-react";
import FooterLinks from "../../src/components/navigation/FooterLinks";
import NavFooter from "../../src/components/navigation/NavFooter";

const headerProps = { ...HEADER_TEXT.home };
const DEFAULT_PROPS = {
  pageId: "home",
  buttonId: "get-started-button"
};

const mockWindowObject = pathname => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      pathname
    }
  });
};

describe("HomeContainer", () => {
  const wrapper = shallow(<WelcomePage />);
  const header = shallow(<PageHeader {...DEFAULT_PROPS} />);
  const footer = shallow(<FooterLinks />);
  const footerIcons = shallow(<NavFooter />);
  let container;

  it("Mounts correctly", () => {
    container = wrapper.find('[data-test-id="welcome-page"]').first();
    expect(container).toBeDefined();
  });

  it("Should render the page header as Unicorn Attractor", () => {
    container = header
      .find(Header)
      .first()
      .props().content;
    expect(container).toBe(headerProps.headerText);
  });

  it("Should click on get started button and redirect to pricing page", () => {
    mockWindowObject("/pricing");
    const getStartedButton = header.find(
      `[data-test-id="${DEFAULT_PROPS.buttonId}"]`
    );

    getStartedButton.simulate("click");
    expect(window.location.pathname).toMatch("/pricing");
  });

  it("Should click on all access button and redirect to pricing page", () => {
    mockWindowObject("/pricing");
    const allAccessButton = wrapper.find('[data-test-id="all-access-button"]');
    allAccessButton.simulate("click");

    expect(window.location.pathname).toMatch("/pricing");
  });

  it("Should click on donation button and redirect to login page", () => {
    mockWindowObject("/login");
    let donationDonationButton = wrapper.find(
      '[data-test-id="make-donation-button"]'
    );

    donationDonationButton.simulate("click");
    expect(window.location.pathname).toMatch("/login");
  });

  it("Should render footer and footer links", () => {
    let container = footer.find('[data-test-id="footer-links"]');
    const links = container.find(List.Item);

    expect(links.length).toBe(5);
  });

  it("Should render  footer icons", () => {
    let container = footerIcons.find('[data-test-id="footer-icons"]');
    const links = container.find(List.Icon);

    expect(links.length).toBe(2);
  });
});
