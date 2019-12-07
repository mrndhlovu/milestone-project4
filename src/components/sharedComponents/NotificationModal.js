import React from "react";

import { Header, Modal } from "semantic-ui-react";
import Notification from "./Notification";

const NotificationModal = ({
  feature,
  history,
  redirect,
  showMessageModal,
  header
}) => {
  return (
    <Modal open={showMessageModal} basic size="tiny">
      <Header icon="browser" content={header} />
      <Notification
        dataTestId="restriction-modal"
        iconName="lock"
        message={`You need a Unicorn PRO account to ${feature}`}
        linkText="Got it"
        redirect={() => history.push(`/${redirect}`)}
      />
    </Modal>
  );
};

export default NotificationModal;
