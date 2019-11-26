import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import UserProfileCard from "../../../src/components/userAuth/UserProfileCard";
import { DEFAULT_IMAGES } from "../../../src/constants/constants";

const DEFAULT_PROPS = {
  props: {
    user: {
      username: "testUsername",
      date_joined: "2019-11-07T22:46:53.400908Z",
      current_membership: { occupation: "Software developer" }
    },
    image: DEFAULT_IMAGES.user,
    handleUploadImage: jasmine.createSpy("handleUploadImage"),
    handleEditImage: jasmine.createSpy("handleUploadImage")
  }
};

describe("User profile", () => {
  let wrapper;
  let container;
  let defaultImage;
  let updateProps;
  let uploadImageButton;

  function init() {
    wrapper = shallow(<UserProfileCard {...DEFAULT_PROPS.props} />);
  }

  beforeEach(() => {
    init();
  });

  it("should render user profile image container with a default image", () => {
    container = findByDataTestId(wrapper, "user-profile-image-container");
    defaultImage = findByDataTestId(container, "default-user-image");

    expect(container.length).toBe(1);
    expect(defaultImage.length).toBe(1);
  });

  it("should render user profile image container with an updated image", () => {
    updateProps = { ...DEFAULT_PROPS.props, image: DEFAULT_IMAGES.login };
    wrapper = shallow(<UserProfileCard {...updateProps} />);

    container = findByDataTestId(wrapper, "user-profile-image-container");
    defaultImage = findByDataTestId(container, "default-user-image");
    const uploadedImage = findByDataTestId(container, "uploaded-user-image");
    uploadImageButton = findByDataTestId(
      container,
      "upload-image-input-button"
    );

    expect(defaultImage.length).toBe(0);
    expect(uploadImageButton.length).toBe(0);
    expect(uploadedImage.length).toBe(1);
  });
});
