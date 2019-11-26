import React from "react";
import { shallow } from "enzyme";

import { Header } from "semantic-ui-react";

import PageHeader from "../../../src/components/sharedComponents/PageHeader";
import { HEADER_TEXT } from "../../../src/constants/headerConstants";

import { findByDataTestId } from "../../testUtils.js/utils";
import BlogList from "../../../src/components/blog/BlogList";

const DEFAULT_PROPS = {
  headerProps: {
    pageId: "blog",
    dataTestId: "blog-page-header",
    buttonId: "from-blog-create-article"
  },
  blogProps: {
    articles: [
      {
        content: "test",
        created_at: "2019-11-16T18:23:51.193278Z",
        id: 1,
        image: "image",
        is_approved: true,
        likes: 0,
        owner: 1,
        short_desc: "test...",
        subject: "Artcile 1",
        title: "test",
        updated_at: "2019-11-16T18:25:01.889927Z",
        username: "mndhlovu",
        views: 25
      },
      {
        content: "test",
        created_at: "2019-11-16T18:23:51.193278Z",
        id: 2,
        image: "image",
        is_approved: true,
        likes: 0,
        owner: 1,
        short_desc: "test...",
        subject: "Artcile 2",
        title: "test",
        updated_at: "2019-11-16T18:25:01.889927Z",
        username: "mndhlovu",
        views: 211
      }
    ]
  }
};

describe("BlogList", () => {
  let wrapper;
  let header;
  let container;

  function init() {
    wrapper = shallow(<BlogList articles={DEFAULT_PROPS.blogProps.articles} />);
    header = shallow(<PageHeader {...DEFAULT_PROPS.headerProps} />);
  }

  beforeEach(() => {
    init();
  });

  it("should blog page header", () => {
    container = findByDataTestId(header, "blog-page-header");

    expect(container.length).toBe(1);
    expect(
      container
        .find(Header)
        .first()
        .props().content
    ).toEqual(HEADER_TEXT.blog.headerText);
  });

  it("renders blog grid container correctly ", () => {
    container = findByDataTestId(wrapper, "blog-list");

    expect(container.length).toBe(1);
    expect(container.props().children.length).toBe(2);
  });

  it("should click on read more button", () => {
    container = findByDataTestId(wrapper, "blog-list");
    const button = findByDataTestId(container, "read-more-button-2");

    expect(button.props().children).toBe("Read more");
    expect(button.props().to).toBe("/article/2");

    expect(container.length).toBe(1);
    expect(container.props().children.length).toBe(2);
  });
});
