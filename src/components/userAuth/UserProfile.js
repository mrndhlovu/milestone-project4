import React, { Fragment } from "react";

import styled from "styled-components";

import {
  Confirm,
  Container,
  Accordion,
  Icon,
  Grid,
  Button
} from "semantic-ui-react";

import UserProfileCard from "./UserProfileCard";
import EditProfile from "./EditProfile";
import EditImageModal from "./EditImageModal";
import UserPurchases from "./UserPurchases";
import { ACCOUNT_CHANGE_OPTION } from "../../constants/constants";
import UserProfileHeader from "./UserProfileHeader";

const StyledContainer = styled(Container)`
  padding: 15px;
  margin-left: 20px !important;
  margin-right: 20px !important;
`;

export const UserProfile = ({
  user,
  handleCancelButtonClick,
  handleUploadImage,
  handleEditImage,
  handleUpdateProfile,
  handleShowConfirmModal,
  handleConfirm,
  allAccess,
  PURCHASES,
  showEditImageModal,
  handleDeleteImage,
  showConfirmModal,
  option,
  activeIndex,
  handleChange,
  handleAccordionClick
}) => {
  const accountType = `Unicorn ${allAccess ? "PRO" : "FREE"} Account`;

  return (
    <Fragment>
      <UserProfileHeader userData={user.data} accountType={accountType} />
      <StyledContainer data-test-id="user-profile-container">
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <UserProfileCard
                image={user.data.current_membership.image}
                user={user.data}
                handleCancelButtonClick={handleCancelButtonClick}
                handleEditImage={handleEditImage}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Accordion styled fluid>
                <Accordion.Title
                  active={activeIndex === 1}
                  index={1}
                  onClick={() => handleAccordionClick(1)}
                >
                  <Icon name="dropdown" />
                  Update account
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                  <Fragment>
                    <p>
                      <Button
                        data-test-id="deactivate-account-button"
                        icon="delete"
                        content="Deactivate account"
                        fluid
                        color="blue"
                        as="a"
                        onClick={() => handleCancelButtonClick("deactivate")}
                      />
                    </p>
                    {allAccess && (
                      <p>
                        <Button
                          fluid
                          data-test-id="cancel-subscription-button"
                          icon="globe"
                          content="Cancel Subscription"
                          color="blue"
                          as="a"
                          onClick={() => handleCancelButtonClick("downgrade")}
                        />
                      </p>
                    )}
                  </Fragment>
                </Accordion.Content>

                <Accordion.Title
                  active={activeIndex === 2}
                  index={2}
                  onClick={() => handleAccordionClick(2)}
                >
                  <Icon name="dropdown" />
                  Purchases
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                  <UserPurchases
                    allAccess={allAccess}
                    purchases={PURCHASES}
                    accountType={accountType}
                  />
                </Accordion.Content>

                <Accordion.Title
                  active={activeIndex === 3}
                  index={3}
                  onClick={() => handleAccordionClick(3)}
                >
                  <Icon name="dropdown" />
                  Update profile
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                  <EditProfile
                    allAccess={allAccess}
                    handleCancelButtonClick={handleCancelButtonClick}
                    userData={user.data}
                    handleUpdateProfile={handleUpdateProfile}
                    handleChange={handleChange}
                  />
                </Accordion.Content>
              </Accordion>
            </Grid.Column>

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
          </Grid.Row>
        </Grid>
      </StyledContainer>
    </Fragment>
  );
};

export default UserProfile;
