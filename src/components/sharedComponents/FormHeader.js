import React from "react";

import { Header } from "semantic-ui-react";

const FormHeader = ({ header }) => {
  return (
    <Header as="h2" color="black" textAlign="center" centered="false">
      {header}
    </Header>
  );
};

export default FormHeader;
