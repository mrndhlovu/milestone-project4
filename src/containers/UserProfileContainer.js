import React, { Component } from "react";
import { connect } from "react-redux";

import { Confirm, Segment, Container } from "semantic-ui-react";

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
    this.state = { showCancelSubscription: false, userData: "" };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelSubscription = this.handleCancelSubscription.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user !== user) {
      if (user.data.username) {
        console.log("updated", user);
      }
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
    const { user } = this.props;
    const { showCancelSubscription } = this.state;

    return (
      <Container style={{ paddingTop: 20 }}>
        <Segment>
          {user.dataReceived && user.data.username && (
            <UserProfileCard
              user={user.data}
              handleCancelSubscription={this.handleCancelSubscription}
            />
          )}
        </Segment>

        <Confirm
          open={showCancelSubscription}
          cancelButton="Never mind"
          confirmButton="Yes, Cancel Subscription"
          content="Are sure you want to cancel your subscription"
          onCancel={() => this.setState({ showCancelSubscription: false })}
          onConfirm={this.handleConfirm}
          size="tiny"
          color="grey"
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserProfile(state)
  };
};

export default connect(
  mapStateToProps,
  { cancelSubscription }
)(UserProfileContainer);
