import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import UserProfile from "../../../src/components/userAuth/UserProfile";
import UserProfileHeader from "../../../src/components/userAuth/UserProfileHeader";
import UserProfileCard from "../../../src/components/userAuth/UserProfileCard";
import UserPurchases from "../../../src/components/userAuth/UserPurchases";
import EditProfile from "../../../src/components/userAuth/EditProfile";
import EditImageModal from "../../../src/components/userAuth/EditImageModal";
import { Confirm } from "semantic-ui-react";

const allAccess = true;
const DEFAULT_PROPS = {
  headerProps: {
    userData: {
      first_name: "Test Name",
      last_name: "Test Lastname",
      username: "TestUserName"
    },
    accountType: `Unicorn ${allAccess ? "PRO" : "FREE"} Account`
  },
  props: {
    user: {
      data: {
        date_joined: "2019-11-07T22:46:53.400908Z",
        email: "testing@gmail.com",
        first_name: "tester",
        id: 1,
        is_active: true,
        last_login: "2019-11-07T22:47:44.667368Z",
        last_name: "test lastname",
        username: "tester123",
        current_membership: {
          bio: "",
          image: "",
          membership: {
            id: 1,
            user_id: 1,
            membership_id: 2,
            type: "pro",
            next_billing_date: "2019-12-12T23:57:58",
            date_signedup: "2019-11-12",
            date_subscribed: "2019-11-12T23:58:00.592357Z"
          },
          occupation: "",
          purchases: {
            donations: {},
            tickets: {}
          }
        }
      }
    },
    handleCancelButtonClick: jasmine.createSpy("handleCancelButtonClick"),
    handleUploadImage: jasmine.createSpy("handleUploadImage"),
    allAccess: false
  }
};

describe("Article Detail", () => {
  let wrapper;
  let header;
  let container;
  let updateProps;

  function init() {
    wrapper = shallow(<UserProfile {...DEFAULT_PROPS.props} />);
    header = shallow(<UserProfileHeader {...DEFAULT_PROPS.headerProps} />);
  }

  beforeEach(() => {
    init();
  });

  it("should render user profile name the header with the correct account type", () => {
    container = findByDataTestId(header, "user-profile-header");
    const heading = findByDataTestId(container, "profile-heading");
    const subHeading = findByDataTestId(container, "profile-sub-heading");

    expect(heading.props().content).toBe(
      DEFAULT_PROPS.headerProps.userData.first_name
    );
    expect(subHeading.props().content).toBe(
      DEFAULT_PROPS.headerProps.accountType
    );
  });

  it("should render user profile container with content", () => {
    container = findByDataTestId(wrapper, "user-profile-container");

    expect(container).toContainMatchingElement(UserProfileCard);
    expect(container).toContainMatchingElement(EditProfile);
    expect(container).toContainMatchingElement(UserPurchases);
    expect(container.length).toBe(1);
  });

  it("should render confirmation modal", () => {
    updateProps = { ...DEFAULT_PROPS.props, showConfirmModal: true };
    wrapper = shallow(<UserProfile {...updateProps} />);
    container = findByDataTestId(wrapper, "user-profile-container");

    expect(container).toContainMatchingElement(Confirm);
  });

  it("should render image editing modal", () => {
    updateProps = { ...DEFAULT_PROPS.props, showEditImageModal: true };
    wrapper = shallow(<UserProfile {...updateProps} />);
    container = findByDataTestId(wrapper, "user-profile-container");

    expect(container).toContainMatchingElement(EditImageModal);
  });

  it("should not find cancel subscription button but find deactivate account button", () => {
    container = findByDataTestId(wrapper, "user-profile-container");
    const deactivateAccountButton = findByDataTestId(
      container,
      "deactivate-account-button"
    );

    const cancelSubscriptionButton = findByDataTestId(
      container,
      "cancel-subscription-button"
    );

    expect(cancelSubscriptionButton.length).toBe(0);

    deactivateAccountButton.props().onClick();
    expect(DEFAULT_PROPS.props.handleCancelButtonClick).toHaveBeenCalledWith(
      "deactivate"
    );
  });

  it("should find cancel subscription button and deactivate account button", () => {
    updateProps = { ...DEFAULT_PROPS.props, allAccess: true };
    wrapper = shallow(<UserProfile {...updateProps} />);

    container = findByDataTestId(wrapper, "user-profile-container");
    const deactivateAccountButton = findByDataTestId(
      container,
      "deactivate-account-button"
    );

    const cancelSubscriptionButton = findByDataTestId(
      container,
      "cancel-subscription-button"
    );

    expect(deactivateAccountButton.length).toBe(1);

    cancelSubscriptionButton.props().onClick();
    expect(DEFAULT_PROPS.props.handleCancelButtonClick).toHaveBeenCalledWith(
      "downgrade"
    );
  });
});
