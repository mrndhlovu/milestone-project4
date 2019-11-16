import React from "react";
import { shallow } from "enzyme";

import { HEADER_TEXT } from "../../src/constants/headerConstants";
import WelcomePage from "../../src/components/WelcomePage";
import PageHeader from "../../src/components/sharedComponents/PageHeader";

const pageHeaderProps = {
  customHeader: true,
  headerObject: { ...HEADER_TEXT.home }
};

const shallowMountHomePage = () => shallow(<WelcomePage />);

const shallowPageHeader = (props = {}) => {
  return shallow(<PageHeader {...pageHeaderProps} {...props} />);
};

describe("HomeContainer", () => {
  const homePage = shallowMountHomePage();
  it("Mounts correctly", () => {
    expect(homePage).toBeDefined();
  });
});
