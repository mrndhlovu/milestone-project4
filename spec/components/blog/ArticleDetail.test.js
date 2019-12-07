import React from "react";
import { shallow } from "enzyme";

import { findByDataTestId } from "../../testUtils.js/utils";
import ArticleDetail from "../../../src/components/blog/ArticleDetail";
import DynamicHeader from "../../../src/components/sharedComponents/DynamicHeader";
import EditButtons from "../../../src/components/sharedComponents/EditButtons";
import Notification from "../../../src/components/sharedComponents/Notification";
import ImageUploader from "../../../src/components/sharedComponents/ImageUploader";

const DEFAULT_PROPS = {
  headerProps: {
    option: "post",
    dataTestId: "article-detail-header",
    title: "Article title"
  },
  props: {
    article: {
      data: {
        content: "test",
        created_at: "2019-11-16T18:23:51.193278Z",
        id: 1,
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
      },
      likes: 2,
      comments: {}
    },
    handleDelete: jasmine.createSpy("handleDelete"),
    handleLikeClick: jasmine.createSpy("handleLikeClick"),
    handleUpdateImage: jasmine.createSpy("handleUpdateImage"),
    history: { push: jasmine.createSpy("onClick") },
    image: "image",
    showConfirmModal: true,
    handleCancel: jasmine.createSpy("handleCancel"),
    handleConfirm: jasmine.createSpy("handleConfirm"),
    user: { id: 1 },
    articleId: 1,
    isArticle: true
  }
};

describe("Article Detail", () => {
  let wrapper;
  let header;
  let container;

  function init() {
    wrapper = shallow(<ArticleDetail {...DEFAULT_PROPS.props} />);
    header = shallow(<DynamicHeader {...DEFAULT_PROPS.headerProps} />);

    container = findByDataTestId(wrapper, "article-detail-container");
  }

  beforeEach(() => {
    init();
  });

  it("should render article detail title in the header", () => {
    container = findByDataTestId(header, "article-detail-header");
    const title = findByDataTestId(container, "article-title");

    expect(container.length).toBe(1);
    expect(title.props().content).toEqual(DEFAULT_PROPS.props.article.title);
  });

  it("should fail to render article image uploader component", () => {
    const imageUploader = findByDataTestId(
      container,
      "article-detail-image-uploader"
    );

    expect(imageUploader.length).toBe(0);
  });

  it("should render article image uploader component", () => {
    const newProps = { ...DEFAULT_PROPS.props, showImageUploader: true };
    const updatedProps = { ...DEFAULT_PROPS, ...newProps };

    wrapper = shallow(<ArticleDetail {...updatedProps} />);
    container = findByDataTestId(wrapper, "article-detail-image-uploader");

    expect(container.find(ImageUploader).length).toBe(1);
  });

  it("should render article content", () => {
    const content = findByDataTestId(container, "article-content");

    expect(container.length).toBe(1);
    expect(content.props().content).toEqual(
      DEFAULT_PROPS.props.article.content
    );
  });

  it("should render article detail edit buttons", () => {
    expect(container).toContainMatchingElement(EditButtons);
  });

  it("should fail to load article comments section and render message", () => {
    const newProps = { ...DEFAULT_PROPS.props, allAccess: false };
    wrapper = shallow(<ArticleDetail {...newProps} />);
    container = findByDataTestId(wrapper, "article-detail-container");

    expect(container).toContainMatchingElement(Notification);
  });

  it("should click on confirm modal buttons", () => {
    const confirmModal = findByDataTestId(wrapper, "article-confirm-modal");

    expect(confirmModal.props().open).toBe(true);

    const cancelButton = confirmModal.props().onCancel;
    cancelButton();
    expect(DEFAULT_PROPS.props.handleCancel).toHaveBeenCalled();

    const confirmButton = confirmModal.props().onConfirm;
    confirmButton();
    expect(DEFAULT_PROPS.props.handleConfirm).toHaveBeenCalled();
  });

  it("should click on article like button", () => {
    const likeButton = findByDataTestId(wrapper, "article-like-buttons");
    likeButton.props().onClick();

    expect(DEFAULT_PROPS.props.handleLikeClick.calls.count()).toBe(1);
  });
});
