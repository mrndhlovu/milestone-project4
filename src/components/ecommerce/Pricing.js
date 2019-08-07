import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

import HeadingImage from "../home/HeadingImage";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Segment,
  Icon
} from "semantic-ui-react";

import {
  unicornFreeServices,
  unicornProServices
} from "../../constants/constants";

export class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Pricing",
      headerButtonUrl: "/create-ticket",
      headerButtonText: "File a ticket",
      subHeading: "Problems are everywhere, solutions are here!"
    };
  }

  renderServicesList(services) {
    return services.map((service, index) => {
      return (
        <List.Item as="a" key={index}>
          <Icon name="check" />
          <List.Content>
            <List.Description>{service}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    const {
      headerText,
      headerButtonUrl,
      headerButtonText,
      subHeading
    } = this.state;

    return (
      <Fragment>
        <HeadingImage
          data={{ headerText, headerButtonUrl, headerButtonText, subHeading }}
        />

        <Segment style={{ padding: "0em" }}>
          <Container>
            <Grid celled="internally" columns="equal" stackable>
              <Grid.Row>
                <Grid.Column style={{ padding: "5em 5em 5em 1em" }}>
                  <Header as="h4" attached="top">
                    $0 Per / month
                  </Header>
                  <div>
                    <Segment>
                      <List>
                        {this.renderServicesList(unicornFreeServices)}
                      </List>
                    </Segment>
                  </div>
                  <Button
                    attached="bottom"
                    content="Free Signup"
                    as={NavLink}
                    to="/signup"
                    color="purple"
                  />
                </Grid.Column>

                <Grid.Column style={{ padding: "5em 1em 5em 5em" }}>
                  <Header as="h4" attached="top">
                    $10 Per user / month billed annually
                  </Header>
                  <div>
                    <Segment>
                      <List>{this.renderServicesList(unicornProServices)}</List>
                    </Segment>
                  </div>
                  <Button
                    attached="bottom"
                    content="Get Started Now"
                    as={NavLink}
                    to="/checkout"
                    color="orange"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </Fragment>
    );
  }
}

export default Pricing;
