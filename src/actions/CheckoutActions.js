import {
  SUBMITTING_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  TRANSCATION_UPDATE_FAIL,
  TRANSCATION_UPDATED,
  UPDATE_TRANSCATION,
  RECEIVE_PENDING_ORDER,
  REQUEST_PENDING_ORDER,
  DELETED_FROM_CART,
  DELETE_FROM_CART,
  RECEIVE_CHECKOUT,
  REQUEST_CHECKOUT,
  RECEIVE_ADD_T0_CART,
  REQUEST_ADD_TO_CART,
  REQUEST_ORDER_DETAIL,
  RECEIVE_ORDER_DETAIL,
  ADD_T0_CART_ERROR,
  ORDER_DETAIL_ERROR,
  PENDING_ORDER_ERROR,
  CHECKOUT_ERROR,
  DELETED_FROM_CART_ERROR
} from "./ActionTypes";

import {
  requestMembershipPayment,
  addMembershipToCart,
  requestTransactionUpdate,
  requestCheckout,
  requestPendingOrder,
  deleteMembershipFromCart,
  requestOrderItemDetail
} from "../apis/apiRequests";

import {
  createMessage,
  makeRequest,
  dataRequestFail,
  requestSuccess
} from "./index";

export const addToCart = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_ADD_TO_CART));
    addMembershipToCart().then(
      response => {
        dispatch(requestSuccess(RECEIVE_ADD_T0_CART, response.data));
        dispatch(createMessage({ successMsg: response.data.message }));
      },
      error => {
        dispatch(dataRequestFail(ADD_T0_CART_ERROR, error.data));
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
        setTimeout(function() {
          dispatch(updateTranscation());
        }, 500);
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(PAYMENT_FAIL, error));
      }
    );
  };
};

export const updateTranscation = () => {
  return dispatch => {
    dispatch(makeRequest(UPDATE_TRANSCATION));
    requestTransactionUpdate().then(
      response => {
        dispatch(requestSuccess(TRANSCATION_UPDATED, response.data));
        dispatch(createMessage({ successMsg: response.data.message }));
        localStorage.removeItem("subscriptionId");
        localStorage.removeItem("stripeToken");
        localStorage.removeItem("cart");
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(TRANSCATION_UPDATE_FAIL, error));
      }
    );
  };
};

export const getPendingOrder = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_PENDING_ORDER));
    requestPendingOrder().then(
      response => {
        dispatch(requestSuccess(RECEIVE_PENDING_ORDER, response.data));
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(PENDING_ORDER_ERROR, error));
      }
    );
  };
};

export const getCheckout = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_CHECKOUT));
    requestCheckout().then(
      response => {
        dispatch(requestSuccess(RECEIVE_CHECKOUT, response.data));
        dispatch(createMessage({ successMsg: response.data.message }));
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(CHECKOUT_ERROR, error));
      }
    );
  };
};

export const deleteFromCart = () => {
  return dispatch => {
    dispatch(makeRequest(DELETE_FROM_CART));
    deleteMembershipFromCart().then(
      response => {
        dispatch(requestSuccess(DELETED_FROM_CART, response.data));
        dispatch(createMessage({ successMsg: response.data.message }));
        localStorage.removeItem("cart");
      },
      error => {
        dispatch(createMessage({ successMsg: error.message }));
        dispatch(dataRequestFail(DELETED_FROM_CART_ERROR, error));
      }
    );
  };
};

export const getOrderDetail = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_ORDER_DETAIL));
    requestOrderItemDetail(id).then(
      response => {
        dispatch(requestSuccess(RECEIVE_ORDER_DETAIL, response.data));
      },
      error => {
        dispatch(createMessage({ successMsg: error.message }));
        dispatch(dataRequestFail(ORDER_DETAIL_ERROR, error));
      }
    );
  };
};
