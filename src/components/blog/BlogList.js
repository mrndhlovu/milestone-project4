import React from "react";

import { Grid } from "semantic-ui-react";

import Article from "./Article";

const BlogList = ({ articles }) => {
  const renderList = () => {
    return Object.keys(articles).map(key => {
      const {
        id,
        title,
        created_at,
        short_disc,
        likes,
        views,
        username
      } = articles[key];
      return (
        <Grid.Column key={key} style={{ paddingBottom: 20 }}>
          <Article
            id={id}
            title={title}
            created_at={created_at}
            short_disc={short_disc}
            likes={likes}
            views={views}
            username={username}
          />
        </Grid.Column>
      );
    });
  };

  return (
    <Grid columns={3} stackable>
      <Grid.Row>{renderList()}</Grid.Row>
    </Grid>
  );
};

export default BlogList;
