import React, { Component } from "react";
import { connect } from "react-redux";

import { Confirm, Grid, Segment } from "semantic-ui-react";

import { StyledContainerWrapper } from "../constants/constants";
import { cancelSubscription } from "../actions/MembershipActions";
import { fetchUserProfile } from "../actions/AuthActions";

import {
  getUserProfile,
  getMembershipProfile
} from "../selectors/appSelectors";
import UserProfileCard from "../components/userAuth/UserProfileCard";

export class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { showCancelSubscription: false };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelSubscription = this.handleCancelSubscription.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserProfile();
  }

  componentDidUpdate(prevProps) {
    const { profile } = this.props;
    if (prevProps.profile !== profile) {
      // profile.user_subscription && window.location.reload();
    }
  }

  handleConfirm() {
    this.props.cancelSubscription();
    this.setState({ showCancelSubscription: false });
  }

  handleCancelSubscription() {
    this.setState({
      showCancelSubscription: !this.state.showCancelSubscription
    });
  }

  render() {
    const { user, profile } = this.props;
    const { showCancelSubscription } = this.state;

    return (
      <StyledContainerWrapper>
        <Grid columns="equal">
          <Grid.Column />
          <Grid.Column width={8}>
            <Segment>
              <UserProfileCard
                user={user}
                profile={profile}
                handleCancelSubscription={this.handleCancelSubscription}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column />
        </Grid>
        <Confirm
          open={showCancelSubscription}
          cancelButton="Never mind"
          confirmButton="Yes, Cancel Subscription"
          content="Are sure you want to cancel your subscription"
          onCancel={() => this.setState({ showCancelSubscription: false })}
          onConfirm={this.handleConfirm}
          color="orange"
        />
      </StyledContainerWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: getMembershipProfile(state),
    user: getUserProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { cancelSubscription, fetchUserProfile }
)(UserProfileContainer);
