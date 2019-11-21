import React, { Fragment } from "react";

import { Confirm, Container, Tab } from "semantic-ui-react";

import UserProfileCard from "./UserProfileCard";
import EditProfile from "./EditProfile";
import UserPurchases from "./UserPurchases";
import PageHeader from "../sharedComponents/PageHeader";
import { ACCOUNT_CHANGE_OPTION } from "../../constants/constants";

export const UserProfilePanes = ({
  user,
  handleCancelButtonClick,
  handleUploadImage,
  handleEditImage,
  handleChange,
  handleUpdateProfile,
  handleShowConfirmModal,
  handleConfirm,
  allAccess,
  PURCHASES,
  showEditImageModal,
  EditImageModal,
  handleDeleteImage,
  showConfirmModal,
  option
}) => {
  const accountType = `Unicorn ${allAccess ? "PRO" : "FREE"} membership`;

  const panes = () => {
    return [
      {
        menuItem: { key: "user", icon: "user", content: "User profile" },
        render: () => (
          <Tab.Pane attached={true}>
            <UserProfileCard
              image={user.data.current_membership.image}
              user={user.data}
              handleCancelButtonClick={handleCancelButtonClick}
              handleUploadImage={handleUploadImage}
              handleEditImage={handleEditImage}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: { key: "edit", icon: "edit", content: "Edit profile" },
        render: () => (
          <Tab.Pane attached={false}>
            <EditProfile
              allAccess={allAccess}
              handleCancelButtonClick={handleCancelButtonClick}
              userData={user.data}
              handleChange={handleChange}
              handleUpdateProfile={handleUpdateProfile}
            />
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
            {PURCHASES && (
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
  };

  return (
    <Fragment>
      <PageHeader pageId="user-profile" hideButton={true} />

      <Container style={{ paddingTop: 20 }}>
        <Tab menu={{ secondary: true, pointing: false }} panes={panes()} />

        {showEditImageModal && (
          <EditImageModal
            showEditImageModal={showEditImageModal}
            user={user.data}
            handleUploadImage={handleUploadImage}
            handleDeleteImage={handleDeleteImage}
            handleEditImage={handleEditImage}
          />
        )}

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
          onCancel={() => handleShowConfirmModal()}
          onConfirm={() => handleConfirm(option)}
          size="tiny"
          color="grey"
        />
      </Container>
    </Fragment>
  );
};
