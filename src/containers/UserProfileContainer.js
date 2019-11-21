import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getUserProfile,
  getUser,
  getProfileUpdate,
  getAccountUpdate
} from "../selectors/appSelectors";
import {
  fetchUser,
  uploadProfileImage,
  updateUserProfile,
  deleteProfileImage
} from "../actions/AuthActions";
import { changeAccount } from "../actions/MembershipActions";
import { ACCOUNT_CHANGE_OPTION } from "../constants/constants";
import { UserProfilePanes } from "../components/userAuth/UserProfilePanes";
import { refresh } from "../utils/appUtils";

export class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      userData: "",
      showDeleteAccount: false,
      option: "",
      editFields: "",
      showEditImageModal: false
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleEditImage = this.handleEditImage.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.handleShowConfirmModal = this.handleShowConfirmModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user, updateProfile, account } = this.props;

    if (prevProps.user.dataReceived !== user.dataReceived) {
      const { first_name, last_name, current_membership: bio } = user.data;
      const editUserFields = { first_name, last_name, ...bio };

      this.setState({ editFields: editUserFields });
    }

    if (prevProps.updateProfile !== updateProfile) {
      if (updateProfile.dataReceived) {
        refresh();
      }
    }

    if (prevProps.account !== account) {
      if (account.dataReceived && account.data.message === "Account deleted") {
        localStorage.clear();
        this.props.history.push("/home");
        refresh();
      }
    }
  }

  handleEditImage() {
    this.setState({
      showEditImageModal: !this.state.showEditImageModal
    });
  }

  handleDeleteImage(fileName) {
    const imageName = fileName.substring(fileName.lastIndexOf("/") + 1);

    this.props.deleteProfileImage(`${imageName}`);
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
    } else {
      this.props.changeAccount(option);

      setTimeout(() => {
        refresh();
      }, 1000);
    }
  }

  handleShowConfirmModal() {
    this.setState({ showConfirmModal: false });
  }

  handleCancelButtonClick(option) {
    this.setState({
      showConfirmModal: !this.state.showConfirmModal,
      option
    });
  }

  render() {
    const { user } = this.props;
    const { showConfirmModal, option, showEditImageModal } = this.state;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;
    const PURCHASES =
      user.dataReceived && user.data.current_membership.purchases;

    return (
      user.dataReceived && (
        <UserProfilePanes
          user={user}
          handleConfirm={this.handleConfirm}
          handleCancelButtonClick={this.handleCancelButtonClick}
          handleUploadImage={this.handleUploadImage}
          handleEditImage={this.handleEditImage}
          handleChange={this.handleChange}
          handleUpdateProfile={this.handleUpdateProfile}
          handleShowConfirmModal={this.handleShowConfirmModal}
          allAccess={allAccess}
          PURCHASES={PURCHASES}
          showEditImageModal={showEditImageModal}
          handleDeleteImage={this.handleDeleteImage}
          showConfirmModal={showConfirmModal}
          option={option}
        />
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserProfile(state),
    auth: getUser(state),
    updateProfile: getProfileUpdate(state),
    account: getAccountUpdate(state)
  };
};

export default connect(mapStateToProps, {
  changeAccount,
  fetchUser,
  uploadProfileImage,
  updateUserProfile,
  deleteProfileImage
})(withRouter(UserProfileContainer));
