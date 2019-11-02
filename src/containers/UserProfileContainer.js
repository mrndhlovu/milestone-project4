import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Confirm, Container, Tab } from "semantic-ui-react";

import { changeAccount } from "../actions/MembershipActions";

import { getUserProfile, getUser } from "../selectors/appSelectors";
import UserProfileCard from "../components/userAuth/UserProfileCard";
import {
  fetchUser,
  uploadProfileImage,
  updateUserProfile
} from "../actions/AuthActions";
import PageHeader from "../components/sharedComponents/PageHeader";
import { getFormatedDate, getFileName } from "../utils/appUtils";
import { ACCOUNT_CHANGE_OPTION } from "../constants/constants";
import EditProfile from "../components/userAuth/EditProfile";
import UserPurchases from "../components/userAuth/UserPurchases";

export class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      userData: "",
      showDeleteAccount: false,
      option: "",
      editFields: ""
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.panes = this.panes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (prevProps.user.dataReceived !== user.dataReceived) {
      const { first_name, last_name, current_membership: bio } = user.data;

      const editUserFields = { first_name, last_name, ...bio };

      this.setState({ editFields: editUserFields });
    }
  }

  panes() {
    const { user } = this.props;

    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;
    const PURCHASES =
      user.dataReceived && user.data.current_membership.purchases;
    const accountType = `Unicorn ${allAccess ? "PRO" : "FREE"} membership`;

    return [
      {
        menuItem: { key: "user", icon: "user", content: "User profile" },
        render: () => (
          <Tab.Pane attached={true}>
            {user.dataReceived && user.data.username && (
              <UserProfileCard
                image={user.data.current_membership.image}
                user={user.data}
                handleCancelButtonClick={this.handleCancelButtonClick}
                handleUploadImage={this.handleUploadImage}
              />
            )}
          </Tab.Pane>
        )
      },
      {
        menuItem: { key: "edit", icon: "edit", content: "Edit profile" },
        render: () => (
          <Tab.Pane attached={false}>
            {user.dataReceived && (
              <EditProfile
                allAccess={allAccess}
                handleCancelButtonClick={this.handleCancelButtonClick}
                userData={user.data}
                handleChange={this.handleChange}
                handleUpdateProfile={this.handleUpdateProfile}
              />
            )}
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: "purchases",
          icon: "shopping basket",
          content: "Purchases"
        },
        render: () => (
          <Tab.Pane attached={false}>
            {PURCHASES && user.dataReceived && (
              <UserPurchases
                allAccess={allAccess}
                purchases={PURCHASES}
                accountType={accountType}
              />
            )}
          </Tab.Pane>
        )
      }
    ];
  }

  handleUploadImage(event) {
    const file = event.target.files[0];
    this.props.uploadProfileImage(file);
  }

  handleChange(event, fieldName) {
    const { editFields } = this.state;
    event.preventDefault();
    this.setState({
      editFields: {
        ...editFields,
        [fieldName]: event.target.value
      }
    });
  }

  handleUpdateProfile() {
    const { editFields } = this.state;
    this.props.updateUserProfile(editFields);
  }

  handleConfirm(option) {
    this.setState({ showConfirmModal: false });

    if (option === ACCOUNT_CHANGE_OPTION.deactivate) {
      this.props.changeAccount(option);

      setTimeout(() => {
        localStorage.clear();
        this.props.history.push("/home");
        window.location.reload();
      }, 1000);
    } else {
      this.props.changeAccount(option);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  handleCancelButtonClick(option) {
    this.setState({
      showConfirmModal: !this.state.showConfirmModal,
      option
    });
  }
  render() {
    const { user } = this.props;
    const { showConfirmModal, option } = this.state;

    const headerObject = {
      headerText: user.dataReceived
        ? user.data.username.toUpperCase()
        : "Loading....",
      subHeading:
        user.dataReceived &&
        `Joined: ${getFormatedDate(user.data.date_joined)}`,
      image: ""
    };
    return (
      <Fragment>
        <PageHeader
          headerObject={headerObject}
          customHeader={true}
          hideButton={true}
        />
        <Container style={{ paddingTop: 20 }}>
          <Tab
            menu={{ secondary: true, pointing: false }}
            panes={this.panes()}
          />

          <Confirm
            open={showConfirmModal}
            cancelButton="Never mind"
            confirmButton={
              option === ACCOUNT_CHANGE_OPTION.deactivate
                ? "Yes delete my account"
                : "Yes, cancel subscription"
            }
            content={`Are sure you want to ${
              option === ACCOUNT_CHANGE_OPTION.deactivate
                ? `delete your account`
                : `cancel your subscription`
            }`}
            onCancel={() => this.setState({ showConfirmModal: false })}
            onConfirm={() => this.handleConfirm(option)}
            size="tiny"
            color="grey"
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserProfile(state),
    auth: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { changeAccount, fetchUser, uploadProfileImage, updateUserProfile }
)(withRouter(UserProfileContainer));
