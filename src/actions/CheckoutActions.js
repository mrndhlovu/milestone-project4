import {
  SUBMITTING_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  TRANSCATION_UPDATE_FAIL,
  TRANSCATION_UPDATED,
  UPDATE_TRANSCATION,
  CHOOSEN_MEMBERSHIP_FOUND,
  FIND_MEMBERSHIP_ERROR,
  FIND_CHOOSEN_MEMBERSHIP
} from "./ActionTypes";

import {
  requestMembershipPayment,
  requestSelectedMemberships,
  requestTransactionUpdate
} from "../apis/apiRequests";

import {
  createMessage,
  makeRequest,
  dataRequestFail,
  requestSuccess
} from "./index";

export const requestChoosenMembership = () => {
  return dispatch => {
    dispatch(makeRequest(FIND_CHOOSEN_MEMBERSHIP));
    requestSelectedMemberships().then(
      response => {
        dispatch(requestSuccess(CHOOSEN_MEMBERSHIP_FOUND, response.data));
        dispatch(createMessage({ successMsg: "Membership selected" }));
      },
      error => {
        dispatch(dataRequestFail(FIND_MEMBERSHIP_ERROR, error.data));
        dispatch(createMessage({ errorMsg: "Payment failed" }));
      }
    );
  };
};

export const requestPayment = () => {
  return dispatch => {
    dispatch(makeRequest(SUBMITTING_PAYMENT));
    requestMembershipPayment().then(
      response => {
        dispatch(requestSuccess(PAYMENT_SUCCESS, response.data));
        localStorage.setItem("subscriptionId", response.data.subscription_id);
        dispatch(requestUpdate());
        dispatch(createMessage({ successMsg: "Payment was successful" }));
      },
      error => {
        dispatch(createMessage({ successMsg: error.message }));
        dispatch(dataRequestFail(PAYMENT_FAIL, error));
      }
    );
  };
};

export const requestUpdate = () => {
  return dispatch => {
    dispatch(makeRequest(UPDATE_TRANSCATION));
    requestTransactionUpdate().then(
      response => {
        dispatch(requestSuccess(TRANSCATION_UPDATED, response));
        dispatch(createMessage({ successMsg: response.data.message }));
        localStorage.removeItem("subscriptionId");
        localStorage.removeItem("stripeToken");
      },
      error => {
        dispatch(createMessage({ successMsg: error.message }));
        dispatch(dataRequestFail(TRANSCATION_UPDATE_FAIL, error));
      }
    );
  };
};
