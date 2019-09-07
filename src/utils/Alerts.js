import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import { getErrors, getMessage } from "../selectors/appSelectors";

export class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps) {
    const { errorAlert, alert, messages } = this.props;

    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.errorAlert.non_field_errors) {
        alert.error(
          `Error: ${errorAlert.alertMsg.errorAlert.non_field_errors.join()}`
        );
      }
      if (errorAlert.non_field_errors) {
        alert.error(`Error: ${errorAlert.non_field_errors.join()}`);
      }
      if (errorAlert.alertMsg.errorAlert.detail) {
        alert.error(`Error: ${errorAlert.alertMsg.errorAlert.detail}`);
      }

      if (errorAlert.alertMsg.email) {
        alert.error(`Error: ${errorAlert.alertMsg.email}`);
      }
      if (errorAlert.alertMsg.password1) {
        alert.error(`Error: ${errorAlert.alertMsg.password1}`);
      }
      if (errorAlert.alertMsg.password2) {
        alert.error(`Error: ${errorAlert.alertMsg.password2}`);
      }
      if (errorAlert.alertMsg.username) {
        alert.error(`Error: ${errorAlert.alertMsg.username}`);
      }
    }
    if (messages !== prevProps.messages) {
      messages.successMsg
        ? alert.success(` ${messages.successMsg.successMsg}`)
        : alert.error(` ${messages.errorMsg.errorMsg}`);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => {
  return {
    errorAlert: getErrors(state),
    messages: getMessage(state)
  };
};

export default connect(mapStateToProps)(withAlert()(Alerts));
