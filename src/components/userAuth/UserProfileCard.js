import React, { Fragment } from "react";

import { Card, Container, Image, Icon, Button } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";

import { DEFAULT_IMAGE } from "../../constants/constants";

const UserProfileCard = ({ user, handleUploadImage, image }) => {
  const { username, bio, date_joined, first_name, last_name } = user;
  const defaultImage = DEFAULT_IMAGE === image;

  return (
    <Container>
      <Card fluid>
        <Image src={image} wrapped ui={false} />

        <Card.Content>
          <Card.Header>
            {first_name} {last_name}
          </Card.Header>
          <Card.Meta>
            <span className="date">Joined {getFormatedDate(date_joined)}</span>
          </Card.Meta>
          <Card.Description>{bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" color="olive" />
          {username.toUpperCase()}

          {defaultImage && (
            <Button floated="right" color="linkedin">
              <span style={{ paddingRight: 10 }}> Upload an image</span>
              <Icon name="upload" color="olive" />
              <input type="file" onChange={event => handleUploadImage(event)} />
            </Button>
          )}
        </Card.Content>
      </Card>
    </Container>
  );
};

export default UserProfileCard;
