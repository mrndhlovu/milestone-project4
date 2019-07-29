import React, { Component, Fragment } from "react";

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

        <Segment style={{ padding: "4em 0em" }}>
          <Container>
            <Grid container stackable>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Help Companies and Companions
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    We can give your company superpowers to do things that they
                    never thought possible. Let us delight your customers and
                    empower your needs... through pure data analytics.
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    We Make Bananas That Can Dance
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Yes that's right, you thought it was the stuff of dreams,
                    but even bananas can be bioengineered.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{ padding: "0em" }}>
          <Container>
            <Grid celled="internally" columns="equal" stackable>
              <Grid.Row>
                <Grid.Column style={{ padding: "5em 5em 5em 1em" }}>
                  <Header as="h4" attached="top">
                    $5 Per / month billed monthly
                  </Header>
                  <div>
                    <Segment>
                      <List>
                        <List.Item as="a">
                          <Icon name="check" />
                          <List.Content>
                            <List.Description>
                              This text will always have a left margin to make
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item as="a">
                          <Icon name="check" />
                          <List.Content>
                            <List.Description>
                              Floated icons are by default top aligned. To have
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item as="a">
                          <Icon name="check" />
                          <List.Content>
                            <List.Description>
                              Floated icons are by default top aligned. To have
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                  </div>
                  <Button
                    attached="bottom"
                    content="Get Started Now"
                    onClick={this.handleClick}
                    onKeyPress={this.handleKeyPress}
                    color="purple"
                  />
                </Grid.Column>

                <Grid.Column style={{ padding: "5em 1em 5em 5em" }}>
                  <Header as="h4" attached="top">
                    $15 Per user / month billed annually
                  </Header>
                  <div>
                    <Segment>
                      <List>
                        <List.Item as="a">
                          <Icon name="check" />
                          <List.Content>
                            <List.Description>
                              This text will always have a left margin to make
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item as="a">
                          <Icon name="check" />
                          <List.Content>
                            <List.Description>
                              Floated icons are by default top aligned. To have
                            </List.Description>
                          </List.Content>
                        </List.Item>
                        <List.Item as="a">
                          <Icon name="check" />
                          <List.Content>
                            <List.Description>
                              Floated icons are by default top aligned. To have
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                  </div>
                  <Button
                    attached="bottom"
                    content="Get Started Now"
                    onClick={this.handleClick}
                    onKeyPress={this.handleKeyPress}
                    color="orange"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{ padding: "2em 0em" }} textAlign="center" vertical>
          <Container text>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: "em 0em", textTransform: "uppercase" }}
            >
              Case Studies
            </Divider>

            <Header as="h3" style={{ fontSize: "2em" }}>
              Did We Tell You About Our Bananas?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Yes I know you probably disregarded the earlier boasts as
              non-sequitur filler content, but it's really true. It took years
              of gene splicing and combinatory DNA research, but our bananas can
              really dance.
            </p>
            <Button as="a" size="large" color="orange">
              I'm Still Quite Interested
            </Button>
          </Container>
        </Segment>
      </Fragment>
    );
  }
}

export default Pricing;
