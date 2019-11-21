import React from "react";

import { Card, Image } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import { DEFAULT_IMAGES } from "../../constants/constants";
import UploadImageButton from "../sharedComponents/UploadImageButton";

const UserProfileCard = ({
  user,
  handleUploadImage,
  image,
  handleEditImage
}) => {
  const {
    username,
    date_joined,
    current_membership: { occupation }
  } = user;
  const defaultImage = DEFAULT_IMAGES.user === image;

  return (
    <Card fluid>
      <Image
        src={image}
        onClick={() => handleEditImage()}
        wrapped
        ui={false}
        label={{
          as: "a",
          color: "red",
          corner: "right",
          icon: "save"
        }}
      />
      <Card.Content>
        <Card.Header>{username.toLowerCase()}</Card.Header>
        <Card.Meta>
          <span className="date">Joined {getFormatedDate(date_joined)}</span>
        </Card.Meta>
        {occupation && <Card.Description>{occupation}</Card.Description>}
      </Card.Content>
      <Card.Content extra>
        {!defaultImage && (
          <UploadImageButton
            handleUploadImage={event => handleUploadImage(event)}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default UserProfileCard;
