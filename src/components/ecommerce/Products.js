import React, { Component, Fragment } from "react";

import HeadingImage from "../home/HeadingImage";

export class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <HeadingImage />
        Features
      </Fragment>
    );
  }
}

export default Features;
