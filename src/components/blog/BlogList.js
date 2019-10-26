import React from "react";

import BlogGrid from "./BlogGrid";

const BlogList = ({ articles }) => {
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
        <BlogGrid
          key={key}
          id={id}
          title={title}
          short_desc={short_desc}
          created_at={created_at}
          likes={likes}
          views={views}
          username={username}
          subject={subject}
          image={image}
        />
      );
    });
  };

  return <div> {renderList()}</div>;
};

export default BlogList;
