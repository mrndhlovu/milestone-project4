import React from "react";

import { Button, Header, Icon, Modal } from "semantic-ui-react";
import NotificationModal from "./NotificationModal";

const MessageModal = ({
  feature,
  history,
  redirect,
  showMessageModal,
  header
}) => {
  return (
    <Modal open={showMessageModal} basic size="tiny">
      <Header icon="browser" content={header} />
      <NotificationModal
        dataTestId="restriction-modal"
        iconName="lock"
        message={`You need a Unicorn PRO account to ${feature}`}
        linkText="Got it"
        redirect={() => history.push(`/${redirect}`)}
      />
    </Modal>
  );
};

export default MessageModal;
