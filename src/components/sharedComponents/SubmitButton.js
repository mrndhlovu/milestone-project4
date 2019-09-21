import React from "react";

import { Button } from "semantic-ui-react";

const SubmitButton = ({ valid, pristine, hasError, buttonText, isLoading }) => {
  return (
    <Button
      color="blue"
      fluid
      size="large"
      type="submit"
      loading={isLoading && !hasError}
      disabled={(!valid || pristine) && true}
    >
      {buttonText}
    </Button>
  );
};

export default SubmitButton;
