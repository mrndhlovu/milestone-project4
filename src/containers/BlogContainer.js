import React, { Component } from "react";
import HomepageHeading from "../components/home/HeadingImage";
import BlogList from "../components/blog/BlogList";

export default class BlogContainer extends Component {
  render() {
    return (
      <div>
        <HomepageHeading />
        <BlogList />
      </div>
    );
  }
}
