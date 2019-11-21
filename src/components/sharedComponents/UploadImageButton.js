import React, { Fragment } from "react";

import { Icon, Button } from "semantic-ui-react";

const UploadImageButton = ({ handleUploadImage, color }) => {
  return (
    <Fragment>
      <Icon name="image" /> Upload image
      <input type="file" onChange={event => handleUploadImage(event)} />
    </Fragment>
  );
};

export default UploadImageButton;
