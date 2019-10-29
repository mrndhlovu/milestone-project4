import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Confirm, Segment, Container } from "semantic-ui-react";

import { cancelSubscription } from "../actions/MembershipActions";

import { getUserProfile } from "../selectors/appSelectors";
import UserProfileCard from "../components/userAuth/UserProfileCard";
import { fetchUser } from "../actions/AuthActions";
import PageHeader from "../components/sharedComponents/PageHeader";
import { getFormatedDate } from "../utils/appUtils";

export class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false,
      userData: "",
      showDeleteAccount: false,
      option: ""
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.user !== user) {
      if (user.data.username) {
      }
    }
  }

  handleConfirm(option) {
    this.setState({ showConfirmModal: false });

    if (option === "deactivate") {
      // this.props.deactivate();
      console.log("will delete account");

      setTimeout(() => {
        localStorage.clear();
        this.props.history.push("/home");
        window.location.reload();
      }, 1000);
    } else {
      this.props.cancelSubscription();

      setTimeout(() => {
        localStorage.clear();
        this.props.history.push("/home");
        window.location.reload();
      }, 1000);
    }
  }

  handleCancelButtonClick(option) {
    this.setState({
      showConfirmModal: !this.state.showConfirmModal,
      option
    });
  }
  render() {
    const { user } = this.props;
    const { showConfirmModal, option } = this.state;
    console.log(user);
    const headerObject = {
      headerText: user.dataReceived
        ? user.data.username.toUpperCase()
        : "Loading....",
      subHeading:
        user.dataReceived &&
        `Joined: ${getFormatedDate(user.data.date_joined)}`,
      image: ""
    };
    return (
      <Fragment>
        <PageHeader
          headerObject={headerObject}
          customHeader={true}
          hideButton={true}
        />
        <Container style={{ paddingTop: 20 }}>
          <Segment>
            {user.dataReceived && user.data.username && (
              <UserProfileCard
                user={user.data}
                handleCancelButtonClick={this.handleCancelButtonClick}
              />
            )}
          </Segment>

          <Confirm
            open={showConfirmModal}
            cancelButton="Never mind"
            confirmButton={
              option === "deactivate"
                ? "Yes delete my account"
                : "Yes, cancel subscription"
            }
            content={`Are sure you want to ${
              option === "deactivate"
                ? `delete your account`
                : `cancel your subscription`
            }`}
            onCancel={() => this.setState({ showConfirmModal: false })}
            onConfirm={() => this.handleConfirm(option)}
            size="tiny"
            color="grey"
          />
        </Container>
      </Fragment>
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
  { cancelSubscription, fetchUser }
)(withRouter(UserProfileContainer));
