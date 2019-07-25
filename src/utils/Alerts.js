import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

export class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps) {
    const { errorAlert, alert, messages } = this.props;
    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.non_field_errors) {
        alert.error(`Error: ${errorAlert.alertMsg.non_field_errors.join()}`);
      }
      if (errorAlert.alertMsg) {
        alert.error(`Error: ${errorAlert.alertMsg}`);
      }
    }
    if (messages !== prevProps.messages) {
      if (messages.messageCreated) {
        alert.success(` ${messages.messageCreated.message}`);
      }
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => {
  return {
    errorAlert: state.errorAlert,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(withAlert()(Alerts));
