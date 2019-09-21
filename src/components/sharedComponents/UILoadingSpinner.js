import React from "react";

import { Dimmer, Loader } from "semantic-ui-react";

export const UILoadingSpinner = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted content="Loading" size="mini" />
    </Dimmer>
  );
};

export default UILoadingSpinner;
