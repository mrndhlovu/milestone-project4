import React, { Component, Fragment } from "react";

import PageHeader from "../home/PageHeader";

export class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <PageHeader />
        Features
      </Fragment>
    );
  }
}

export default Features;
