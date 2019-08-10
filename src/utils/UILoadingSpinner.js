import React, { Component, Fragment } from "react";

import { Dimmer, Loader, Image } from "semantic-ui-react";

export class UILoadingSpinner extends Component {
  render() {
    return (
      <Fragment>
        <Dimmer active inverted>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </Fragment>
    );
  }
}

export default UILoadingSpinner;
