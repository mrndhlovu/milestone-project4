import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

export class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps) {
    const { errorAlert, alert } = this.props;
    if (errorAlert !== prevProps.errorAlert) {
      if (errorAlert.alertMsg.non_field_errors) {
        alert.error(`Error: ${errorAlert.alertMsg.non_field_errors.join()}`);
      }
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => {
  return {
    errorAlert: state.errorAlert
  };
};

export default connect(mapStateToProps)(withAlert()(Alerts));
