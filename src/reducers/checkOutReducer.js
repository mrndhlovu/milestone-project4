import {
  SUBMITTING_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  TRANSCATION_UPDATE_FAIL,
  TRANSCATION_UPDATED,
  UPDATE_TRANSCATION,
  ERROR_ALERT,
  RECEIVE_PENDING_ORDER,
  REQUEST_PENDING_ORDER,
  DELETED_FROM_CART,
  DELETE_FROM_CART,
  RECEIVE_CHECKOUT,
  REQUEST_CHECKOUT,
  RECEIVE_ADD_T0_CART,
  REQUEST_ADD_TO_CART
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import {
  hasError,
  fetchingData,
  dataReceived
} from "../utils/appCheckoutUtils";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_ADD_TO_CART || DELETE_FROM_CART || REQUEST_PENDING_ORDER:
      return fetchingData(state, action);

    case UPDATE_TRANSCATION || SUBMITTING_PAYMENT || REQUEST_CHECKOUT:
      return fetchingData(state, action);
    case TRANSCATION_UPDATE_FAIL || PAYMENT_FAIL || ERROR_ALERT:
      return hasError(state, action);

    case TRANSCATION_UPDATED || PAYMENT_SUCCESS || RECEIVE_CHECKOUT:
      return dataReceived(state, action);

    case RECEIVE_PENDING_ORDER || DELETED_FROM_CART || RECEIVE_ADD_T0_CART:
      return dataReceived(state, action);

    default:
      return state;
  }
}
