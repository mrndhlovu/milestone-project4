import React from "react";

import { Dimmer, Loader } from "semantic-ui-react";

export const UILoadingSpinner = () => {
  return (
    <Dimmer active inverted>
      <Loader size="mini">Loading</Loader>
    </Dimmer>
  );
};

export default UILoadingSpinner;
