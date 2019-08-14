import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import HeadingImage from "../home/HeadingImage";

import {
  Button,
  Container,
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

import { fetchMembershipsList } from "../../actions/MembershipsActions";

export class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "Pricing",
      headerButtonUrl: "/create-ticket",
      headerButtonText: "File a ticket",
      subHeading: "Problems are everywhere, solutions are here!"
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
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

  handleAddToCart() {}

  componentDidMount() {
    this.props.fetchMembershipsList();
  }

  renderMembershipOption(type) {
    const { memberships } = this.props;

    return memberships.map(membership => {
      const { price, id, slug } = membership;
      const buttonText = type === slug ? "Free Signup" : "Add to Cart";
      const buttonColor = type === slug ? "black" : "orange";
      const redirectUrl = type === slug ? "/signup" : "/cart";
      const header = type === slug ? `Unicorn ${slug}` : `Unicorn ${slug}`;

      return (
        <Grid.Column style={{ padding: "5em 5em 5em 1em" }} key={id}>
          <Header
            as="h2"
            attached="top"
            color={type === slug ? "black" : "purple"}
            textAlign="center"
            content={header.toUpperCase()}
            subheader={
              type === slug
                ? `${price} Per / month`
                : `${price} Per user / month billed annually`
            }
          />

          <div>
            <Segment>
              <List>
                {type === slug
                  ? this.renderServicesList(unicornFreeServices)
                  : this.renderServicesList(unicornProServices)}
              </List>
            </Segment>
          </div>
          <Button
            attached="bottom"
            content={buttonText.toUpperCase()}
            as={NavLink}
            to={redirectUrl}
            color={buttonColor}
          />
        </Grid.Column>
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
              <Grid.Row>{this.renderMembershipOption("free")}</Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberships: state.memberships.membershipList
  };
};

export default connect(
  mapStateToProps,
  { fetchMembershipsList }
)(Pricing);
