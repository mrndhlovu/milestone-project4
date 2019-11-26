import React from "react";

import { Card, Image } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import { DEFAULT_IMAGES } from "../../constants/constants";

const UserProfileCard = ({ user, image, handleEditImage }) => {
  const {
    username,
    date_joined,
    current_membership: { occupation }
  } = user;

  const isUsingDefaultImage = DEFAULT_IMAGES.user.localeCompare(image) === 0;

  return (
    <Card fluid data-test-id="user-profile-image-container">
      <Image
        data-test-id={
          isUsingDefaultImage ? "default-user-image" : "uploaded-user-image"
        }
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
    </Card>
  );
};

export default UserProfileCard;
