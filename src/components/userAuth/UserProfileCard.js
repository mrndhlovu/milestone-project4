import React from "react";
import styled from "styled-components";

import { Card, Image, Grid, Container } from "semantic-ui-react";

import { getFormatedDate } from "../../utils/appUtils";
import { DEFAULT_IMAGES } from "../../constants/constants";
import UploadImageButton from "../sharedComponents/UploadImageButton";

const StyledContainer = styled(Container)`
  padding: 5px;
`;

const UserProfileCard = ({
  user,
  handleUploadImage,
  image,
  handleEditImage
}) => {
  const {
    username,
    date_joined,
    first_name,
    last_name,
    current_membership: { bio, occupation }
  } = user;
  const defaultImage = DEFAULT_IMAGES.user === image;

  return (
    <StyledContainer>
      <Card.Group>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={8}>
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
                  <Card.Header>
                    {first_name} {last_name}
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      Joined {getFormatedDate(date_joined)}
                    </span>
                  </Card.Meta>
                  <Card.Description>{occupation}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {defaultImage && (
                    <UploadImageButton handleUploadImage={handleUploadImage} />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Card fluid>
                <Card.Content header={`About ${first_name.toUpperCase()}`} />
                <Card.Content description={bio} />
                <Card.Content extra>
                  <Card.Content extra>
                    Username: {username.toUpperCase()}
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Group>
    </StyledContainer>
  );
};

export default UserProfileCard;
