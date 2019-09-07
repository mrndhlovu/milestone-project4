import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import HeadingImage from "../home/HeadingImage";
import { getMemberships, getUser } from "../../selectors/appSelectors";
import { StyledContainerWrapper } from "../../constants/constants";

import { List, Icon } from "semantic-ui-react";

import { fetchMembershipsList } from "../../actions/MembershipActions";
import MembershipOptions from "./MembershipOptions";

export class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freeMembership: true
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

  render() {
    const {
      authUser: { isAuthenticated }
    } = this.props;
    const { memberships } = this.props;

    return (
      <Fragment>
        <HeadingImage />
        <StyledContainerWrapper>
          <MembershipOptions
            isAuthenticated={isAuthenticated}
            memberships={memberships}
            membershipChoice={this.renderServicesList}
          />
        </StyledContainerWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    memberships: getMemberships(state),
    authUser: getUser(state)
  };
};

export default connect(
  mapStateToProps,
  { fetchMembershipsList }
)(Pricing);
