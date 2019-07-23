import React, { Component, Fragment } from "react";

import HeadingImage from "../components/home/HeadingImage";

export class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Pricing",
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
        Pricing
      </Fragment>
    );
  }
}

export default Pricing;
