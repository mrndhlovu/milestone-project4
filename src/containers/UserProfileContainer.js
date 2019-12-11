import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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
  deleteImage
} from "../actions/AuthActions";
import { changeAccount } from "../actions/MembershipActions";
import { ACCOUNT_CHANGE_OPTION } from "../constants/constants";
import UserProfile from "../components/userAuth/UserProfile";
import { refresh, getNewFileName } from "../utils/appUtils";

export class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      userData: "",
      showDeleteAccount: false,
      option: "",
      editFields: "",
      showEditImageModal: false,
      activeIndex: 2
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.handleEditImage = this.handleEditImage.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.handleShowConfirmModal = this.handleShowConfirmModal.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
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

  handleAccordionClick(index) {
    const { activeIndex } = this.state;
    if (index === activeIndex) {
      return this.setState({ activeIndex: 0 });
    }
    this.setState({ activeIndex: index });
  }

  handleEditImage() {
    this.setState({
      showEditImageModal: !this.state.showEditImageModal
    });
  }

  handleDeleteImage(fileName) {
    this.props.deleteImage();
  }

  handleUploadImage(file) {
    const fileName = getNewFileName(file.name);

    this.props.uploadProfileImage(file, fileName);
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
    const filterUpdatedfields = { ...editFields };

    delete filterUpdatedfields.membership;
    delete filterUpdatedfields.purchases;

    this.props.updateUserProfile(filterUpdatedfields);
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
    const {
      showConfirmModal,
      option,
      showEditImageModal,
      activeIndex
    } = this.state;
    const allAccess =
      user.dataReceived &&
      user.data.current_membership.membership.is_pro_member;
    const PURCHASES =
      user.dataReceived && user.data.current_membership.purchases;

    return (
      user.dataReceived && (
        <UserProfile
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
          activeIndex={activeIndex}
          handleAccordionClick={this.handleAccordionClick}
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

UserProfileContainer.propTypes = {
  updateProfile: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  changeAccount: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  changeAccount,
  fetchUser,
  uploadProfileImage,
  updateUserProfile,
  deleteImage
})(withRouter(UserProfileContainer));
