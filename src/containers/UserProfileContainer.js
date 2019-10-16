import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Confirm, Segment, Container } from "semantic-ui-react";

import { cancelSubscription } from "../actions/MembershipActions";

import { getUserProfile } from "../selectors/appSelectors";
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
      }
    }
  }

  handleConfirm() {
    this.props.cancelSubscription();
    this.setState({ showCancelSubscription: false });

    setTimeout(() => {
      localStorage.clear();
      this.props.history.push("/");
      window.location.reload();
    }, 1000);
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
)(withRouter(UserProfileContainer));
