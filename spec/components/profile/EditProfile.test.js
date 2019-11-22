import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import EditProfile from "../../../src/components/userAuth/EditProfile";
import { Form } from "semantic-ui-react";

const DEFAULT_PROPS = {
  props: {
    userData: {
      first_name: "Test name",
      last_name: "Test lastname",
      current_membership: {
        occupation: "Software developer",
        bio: "User test bio"
      }
    },
    handleUpdateProfile: jasmine.createSpy("handleUpdateProfile"),
    handleChange: jasmine.createSpy("handleChange")
  }
};

describe("Article Detail", () => {
  let wrapper;
  let container;
  let button;

  function init() {
    wrapper = shallow(<EditProfile {...DEFAULT_PROPS.props} />);
  }

  beforeEach(() => {
    init();
  });

  it("should render the edit user profile container with all form properties", () => {
    container = findByDataTestId(wrapper, "edit-profile-form");
    const formFields = container.props().children.find(Form.Group).props
      .children;

    const testArea = findByDataTestId(wrapper, "edit-profile-form-tex-area");

    expect(container.length).toBe(1);
    expect(container.props().as).toBe("form");
    expect(formFields[0].props.defaultValue).toBe(
      DEFAULT_PROPS.props.userData.first_name
    );
    expect(formFields[1].props.defaultValue).toBe(
      DEFAULT_PROPS.props.userData.last_name
    );
    expect(formFields[2].props.defaultValue).toBe(
      DEFAULT_PROPS.props.userData.current_membership.occupation
    );

    expect(testArea.props().defaultValue).toBe(
      DEFAULT_PROPS.props.userData.current_membership.bio
    );

    testArea.props().onChange();
    expect(DEFAULT_PROPS.props.handleChange).toHaveBeenCalled();

    button = findByDataTestId(wrapper, "edit-profile-form-submit-button");
    button.props().onClick();

    expect(DEFAULT_PROPS.props.handleUpdateProfile).toHaveBeenCalled();
  });
});
