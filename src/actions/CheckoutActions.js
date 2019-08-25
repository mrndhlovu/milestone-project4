import { USER_AUTH_START } from "./ActionTypes";

import { requestMembershipPayment } from "../apis/apiRequests";

import { createMessage } from "./index";

export const receivedPaymentError = () => {
  return {
    type: USER_AUTH_START
  };
};

export const submittingPayment = () => {
  return {
    type: USER_AUTH_START
  };
};

export const createToken = token => {
  //   const stripeToken = localStorage.setItem("stripeToken", token);

  return {
    type: USER_AUTH_START
  };
};

export const receivedPaymentSuccess = () => {
  return {
    type: USER_AUTH_START
  };
};

export const submit = () => {
  return dispatch => {
    dispatch(submittingPayment());
    requestMembershipPayment().then(
      response => {
        dispatch(receivedPaymentSuccess(response.data));
        dispatch(createMessage({ successMsg: "Payment was successful" }));
      },
      error => {
        dispatch(receivedPaymentError(error.data));
        dispatch(createMessage({ errorMsg: "Payment failed" }));
      }
    );
  };
};
