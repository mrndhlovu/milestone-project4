import React from "react";

import { Button, Header, Icon, Modal } from "semantic-ui-react";

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
      <Modal.Content>
        <h3>You need a Unicorn PRO account to {feature}</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" onClick={() => history.push(`/${redirect}`)}>
          <Icon name="arrow right" /> Got it
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MessageModal;
