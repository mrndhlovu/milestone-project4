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

import { createMessage, fetchData } from "./index";

export const receivedPaymentSuccess = action => {
  return {
    type: PAYMENT_SUCCESS,
    payload: action
  };
};

export const paymentFail = action => {
  return {
    type: PAYMENT_FAIL,
    payload: action
  };
};

export const receivedTransUpdate = action => {
  return {
    type: TRANSCATION_UPDATED,
    payload: action
  };
};

export const updateTransFail = action => {
  return {
    type: TRANSCATION_UPDATE_FAIL,
    payload: action
  };
};

export const receivedSelectMembership = action => {
  return {
    type: CHOOSEN_MEMBERSHIP_FOUND,
    payload: action
  };
};

export const selectedMembershipError = action => {
  return {
    type: FIND_MEMBERSHIP_ERROR,
    payload: action
  };
};

export const requestChoosenMembership = () => {
  return dispatch => {
    dispatch(fetchData(FIND_CHOOSEN_MEMBERSHIP));
    requestSelectedMemberships().then(
      response => {
        dispatch(receivedSelectMembership(response.data));
        dispatch(createMessage({ successMsg: "Membership selected" }));
      },
      error => {
        dispatch(selectedMembershipError(error.data));
        dispatch(createMessage({ errorMsg: "Payment failed" }));
      }
    );
  };
};

export const requestPayment = () => {
  return dispatch => {
    dispatch(fetchData(SUBMITTING_PAYMENT));
    requestMembershipPayment().then(
      response => {
        localStorage.setItem("subscriptionId", response.data.subscription_id);
        dispatch(requestUpdate());

        dispatch(receivedPaymentSuccess(response.data));
        dispatch(createMessage({ successMsg: "Payment was successful" }));
      },
      error => {
        dispatch(createMessage({ successMsg: error.message }));
        dispatch(paymentFail(error));
      }
    );
  };
};

export const requestUpdate = () => {
  return dispatch => {
    dispatch(fetchData(UPDATE_TRANSCATION));
    requestTransactionUpdate().then(
      response => {
        dispatch(receivedTransUpdate(response));
        dispatch(createMessage({ successMsg: response.data.message }));
        // localStorage.removeItem("subscriptionId");
        // localStorage.removeItem("stripeToken");
      },
      error => {
        dispatch(createMessage({ successMsg: error.message }));
        dispatch(updateTransFail(error));
      }
    );
  };
};
