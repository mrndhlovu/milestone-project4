import React from "react";
import { shallow } from "enzyme";

import HomeContainer from "../../../containers/HomeContainer";
import PageHeader from "../../../components/sharedComponents/PageHeader";

describe("HomePage", () => {
  let renderedHomePage;

  beforeEach(() => {
    renderedHomePage = shallow(<HomeContainer />);
  });
});

describe("should render a PageHeader", () => {
  it("loadsPageHeader", () => {
    expect(renderedHomePage.find(PageHeader).toBe(true));
  });
});
