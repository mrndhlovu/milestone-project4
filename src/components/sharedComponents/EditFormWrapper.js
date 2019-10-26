import React from "react";

import { Button, Form, Container, Segment, Header } from "semantic-ui-react";

const EditFormWrapper = ({
  headerText,
  fieldComponent,
  handleSubmitClick,
  updating
}) => {
  return (
    <Container style={{ paddingTop: 20 }}>
      <Header content={headerText} />
      <Segment>
        <Form>
          {fieldComponent}
          <Button
            loading={updating}
            size="small"
            color="blue"
            type="submit"
            onClick={() => handleSubmitClick()}
          >
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default EditFormWrapper;
