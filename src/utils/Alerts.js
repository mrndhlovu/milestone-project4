import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import { getMessage } from "../selectors/appSelectors";

export class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { alert, messages } = this.props;
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

const mapStateToProps = state => ({ messages: getMessage(state) });
export default connect(mapStateToProps)(withAlert()(Alerts));
