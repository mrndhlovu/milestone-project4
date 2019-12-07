import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Container, Grid, Button, Header, Image } from "semantic-ui-react";

import PageHeader from "../sharedComponents/PageHeader";
import { getPageId } from "../../utils/urls";
import { getFormatedDate } from "../../utils/appUtils";
import StyledMessage from "../sharedComponents/StyledMessage";

const BlogList = ({ articles }) => {
  const emptyArticleList = articles === [];

  const renderList = () => {
    return Object.keys(articles).map(key => {
      const {
        id,
        title,
        created_at,
        short_desc,
        likes,
        views,
        username,
        subject,
        image
      } = articles[key];
      return (
        <Grid.Row
          style={{ padding: "3em 0em" }}
          key={key}
          data-test-id="article-list-container"
        >
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
                  alt={`image-${id}`}
                  data-test-id={`article-${id}-image`}
                />
              </Grid.Column>
              <Grid.Column width={8} floated="right">
                <NavLink to={`article/${id}`}>
                  <Header as="h2" color="black" content={title.toUpperCase()} />
                </NavLink>
                <p>
                  {getFormatedDate(created_at)} | Likes {likes} | Views {views}{" "}
                  | by {username}
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
                  data-test-id={`read-more-button-${id}`}
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
    });
  };

  return (
    <Fragment>
      <PageHeader
        pageId={getPageId()}
        dataTestId="blog-page-header"
        buttonId="from-blog-create-article"
      />
      <Container data-test-id="blog-list" style={{ paddingTop: 20 }}>
        {!emptyArticleList ? (
          renderList()
        ) : (
          <StyledMessage
            redirect="/new-article"
            message="There no articles at this moment..."
            linkText="Create article"
            iconName="content"
          />
        )}
      </Container>
    </Fragment>
  );
};

export default BlogList;
