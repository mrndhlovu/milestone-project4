import React from "react";

import { Icon, Button } from "semantic-ui-react";

const UploadImageButton = ({ handleUploadImage, color }) => {
  return (
    <Button floated="right" color={color || ""}>
      <Icon name="upload" />
      <input type="file" onChange={event => handleUploadImage(event)} />
    </Button>
  );
};

export default UploadImageButton;
