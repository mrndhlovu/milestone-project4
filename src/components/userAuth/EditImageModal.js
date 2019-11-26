import React from "react";
import { Modal, Image, Button } from "semantic-ui-react";
import ImageUploader from "../sharedComponents/ImageUploader";

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
          <ImageUploader
            handleUploadImage={handleUploadImage}
            handleDeleteImage={handleDeleteImage}
          />
        </Modal.Description>
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
