import {
  ADD_T0_CART_ERROR,
  CHECKOUT_ERROR,
  DELETED_FROM_CART_ERROR,
  DELETED_FROM_CART,
  PENDING_ORDER_ERROR,
  RECEIVE_ADD_T0_CART,
  RECEIVE_CHECKOUT,
  RECEIVE_PENDING_ORDER,
  REQUEST_ADD_TO_CART,
  REQUEST_CHECKOUT,
  REQUEST_PENDING_ORDER,
  TRANSCATION_UPDATE_FAIL,
  TRANSCATION_UPDATED,
  UPDATE_TRANSCATION
} from "./ActionTypes";

import {
  requestTransactionUpdate,
  requestAddItemToCart,
  requestPendingOrder,
  requestRemoveItemFromCart,
  requestItemPayment
} from "../apis/apiRequests";

import {
  createMessage,
  makeRequest,
  dataRequestFail,
  requestSuccess
} from "./index";
import { destroyLocalStorage } from "../utils/appUtils";

export const addItemToCart = (id, productType) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_ADD_TO_CART));
    requestAddItemToCart(id, productType).then(
      response => {
        const subscriptionId = response.data.subscription_id || undefined;
        if (subscriptionId) {
          localStorage.setItem("subscriptionId", subscriptionId);
        }

        dispatch(requestSuccess(RECEIVE_ADD_T0_CART, response.data));
        dispatch(createMessage({ successMsg: response.data.message }));
        dispatch(fetchPendingOrder());
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(ADD_T0_CART_ERROR, error));
      }
    );
  };
};

export const fetchPendingOrder = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_PENDING_ORDER));
    requestPendingOrder().then(
      response => {
        dispatch(requestSuccess(RECEIVE_PENDING_ORDER, response.data));
      },
      error => {
        dispatch(createMessage({ errorMsg: "No cart found" }));
        dispatch(dataRequestFail(PENDING_ORDER_ERROR, error.message));
      }
    );
  };
};

export const removeItemFromCart = (id, productType) => {
  return dispatch => {
    dispatch(makeRequest(DELETED_FROM_CART));
    requestRemoveItemFromCart(id, productType).then(
      response => {
        dispatch(requestSuccess(DELETED_FROM_CART, response.data));
        dispatch(fetchPendingOrder());
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(DELETED_FROM_CART_ERROR, error));
      }
    );
  };
};

export const makePayment = () => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_CHECKOUT));
    requestItemPayment().then(
      response => {
        dispatch(requestSuccess(RECEIVE_CHECKOUT, response.data));
        dispatch(fetchPendingOrder());
        dispatch(createMessage({ successMsg: response.data.message }));
        destroyLocalStorage(["subscriptionId", "stripeToken"]);
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(CHECKOUT_ERROR, error));
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
      },
      error => {
        dispatch(createMessage({ errorMsg: error.message }));
        dispatch(dataRequestFail(TRANSCATION_UPDATE_FAIL, error));
      }
    );
  };
};
