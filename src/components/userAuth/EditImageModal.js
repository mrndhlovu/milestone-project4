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
          <p>
            <Button floated="right">
              <Icon name="upload" />
              <input type="file" onChange={event => handleUploadImage(event)} />
            </Button>
          </p>
        </Modal.Description>
        <p>
          <Button
            floated="right"
            color="blue"
            onClick={() => handleDeleteImage(image)}
          >
            <Icon name="delete" />
            Delete profile image
          </Button>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => handleEditImage()} negative>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditImageModal;
