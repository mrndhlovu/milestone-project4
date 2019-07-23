import React, { Component, Fragment } from "react";

import HeadingImage from "../components/home/HeadingImage";

export class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Products",
      headerButtonUrl: "/pricing",
      headerButtonText: "Get Started"
    };
  }
  render() {
    const { headerText, headerButtonUrl, headerButtonText } = this.state;

    return (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText }}
        />
        Features
      </Fragment>
    );
  }
}

export default Features;
