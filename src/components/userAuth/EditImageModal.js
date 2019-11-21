import React from "react";
import { Modal, Image, Button, Icon } from "semantic-ui-react";

const EditImageModal = ({
  showEditImageModal,
  user,
  handleUploadImage,
  handleDeleteImage,
  handleEditImage
}) => {
  const { image } = user.current_membership;
  return (
    <Modal open={showEditImageModal}>
      <Modal.Header>Edit Profile Image</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={image} />
        <Modal.Description>
          <Icon name="image" /> Update image
          <input type="file" onChange={event => handleUploadImage(event)} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          floated="left"
          color="blue"
          onClick={() => handleDeleteImage(image)}
        >
          <Icon name="delete" />
          Remove image
        </Button>
        <Button onClick={() => handleEditImage()} negative>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditImageModal;
