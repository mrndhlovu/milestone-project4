import React, { Fragment } from "react";

import { Card, Container, Image, Icon } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";

import { DEFAULT_IMAGE } from "../../constants/constants";

const UserProfileCard = ({ user, handleUploadImage, image }) => {
  const { username, bio, date_joined } = user;
  const defaultImage = DEFAULT_IMAGE === image;

  return (
    <Container>
      <Card fluid>
        <Image src={image} />
        <Card.Content>
          <Card.Header>First_name Lastname</Card.Header>
          <Card.Meta>
            <span className="date">Joined {getFormatedDate(date_joined)}</span>
          </Card.Meta>
          <Card.Description>{bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" color="olive" />
          {username.toUpperCase()}
          defaultImage && (
          <input type="file" onChange={event => handleUploadImage(event)} />)
        </Card.Content>
      </Card>
    </Container>
  );
};

export default UserProfileCard;
