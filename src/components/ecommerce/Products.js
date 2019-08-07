import React, { Component, Fragment } from "react";

import HeadingImage from "../home/HeadingImage";

export class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Products",
      headerButtonUrl: "/pricing",
      headerButtonText: "See what suite you",
      subHeading: "How it will work for you?"
    };
  }
  render() {
    const {
      headerText,
      headerButtonUrl,
      headerButtonText,
      subHeading
    } = this.state;

    return (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText, subHeading }}
        />
        Features
      </Fragment>
    );
  }
}

export default Features;
