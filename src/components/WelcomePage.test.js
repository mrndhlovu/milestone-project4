import React from "react";
import { shallow } from "enzyme";

import PageHeader from "./sharedComponents/PageHeader";
import { HEADER_TEXT } from "../constants/headerConstants";
import WelcomePage from "./WelcomePage";

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
