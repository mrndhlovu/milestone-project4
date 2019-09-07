import React, { Fragment } from "react";

import { Dimmer, Loader } from "semantic-ui-react";

export const UILoadingSpinner = () => {
  return (
    <Fragment>
      <Dimmer active inverted>
        <Loader size="mini">Loading</Loader>
      </Dimmer>
    </Fragment>
  );
};

export default UILoadingSpinner;
