import React, { Component } from "react";
import { connect } from "react-redux";
import { getFormatedDate } from "../../constants/constants";
import { Redirect } from "react-router-dom";

import { Item, Card, Label, Confirm } from "semantic-ui-react";
import { StyledContainerWrapper } from "../../constants/constants";

import { cancelSubscription } from "../../actions/MembershipActions";

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { showCancelSubscription: false };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.props.cancelSubscription();
    this.setState({ showCancelSubscription: false });
  }

  render() {
    const {
      user: { username },
      profile: { user_subscription, created_at, next_billing, is_active },
      auth: { isAuthenticated }
    } = this.props;
    const { showCancelSubscription } = this.state;

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <StyledContainerWrapper>
        {cancelSubscription && (
          <Confirm
            open={showCancelSubscription}
            cancelButton="Never mind"
            confirmButton="Yes, Cancel Subscription"
            content="Are sure you want to cancel your subscription"
            onCancel={() => this.setState({ showCancelSubscription: false })}
            onConfirm={this.handleConfirm}
          />
        )}
        <Card fluid>
          <Card.Content header="Your Profile" />
          <Card.Content>
            <Item.Image src="/images/wireframe/image.png" />
            <Item.Content>
              <Item.Header>{username}</Item.Header>
              <Item.Meta>
                <span>
                  User Subscription:
                  {user_subscription === "pro" ? "Professional" : "Free"}
                </span>
              </Item.Meta>
              <Item.Meta>
                <span>Date created: {getFormatedDate(created_at)}</span>
              </Item.Meta>
              <Item.Meta>
                <span>Next billing date: {getFormatedDate(next_billing)}</span>
              </Item.Meta>
              <Item.Meta>
                <span>Account status: {is_active && "Active"}</span>
              </Item.Meta>
              <Item.Extra>
                <Label
                  icon="globe"
                  content="Cancel Subscription"
                  floated="right"
                  color="orange"
                  as="a"
                  onClick={() =>
                    this.setState({ showCancelSubscription: true })
                  }
                />
              </Item.Extra>
            </Item.Content>
          </Card.Content>
        </Card>
      </StyledContainerWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.userProfile.profile,
    auth: state.auth,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { cancelSubscription }
)(UserProfile);
