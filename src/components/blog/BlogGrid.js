import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Grid, Header, Image } from "semantic-ui-react";
import { getFormatedDate } from "../../utils/appUtils";

const BlogGrid = ({
  id,
  title,
  subject,
  short_desc,
  created_at,
  likes,
  image,
  views
}) => {
  return (
    <Grid.Row style={{ padding: "3em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={image}
              as={NavLink}
              to={`/article/${id}`}
            />
          </Grid.Column>
          <Grid.Column width={8} floated="right">
            <Header as="h2" color="black">
              {title.toUpperCase()}
            </Header>
            <p>
              {getFormatedDate(created_at)} | Likes {likes} | Views {views}
            </p>
            <Header as="h4" color="grey">
              {subject.toUpperCase()}
            </Header>
            <p style={{ fontSize: "1.33em" }}>{short_desc}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="right">
            <Button
              color="orange"
              size="small"
              as={NavLink}
              to={`/article/${id}`}
            >
              Read more
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Row>
  );
};

export default BlogGrid;
