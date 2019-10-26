import React from "react";

import Article from "./Article";
import BlogGrid from "./BlogGrid";

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
        <Article
          key={key}
          id={id}
          title={title}
          created_at={created_at}
          short_disc={short_disc}
          likes={likes}
          views={views}
          username={username}
        />
      );
    });
  };

  return <BlogGrid article={renderList()} />;
};

export default BlogList;
