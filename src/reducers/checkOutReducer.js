import {
  SUBMITTING_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  TRANSCATION_UPDATE_FAIL,
  TRANSCATION_UPDATED,
  UPDATE_TRANSCATION,
  CHECKOUT_ERROR,
  RECEIVE_CHECKOUT,
  REQUEST_CHECKOUT
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_TRANSCATION || SUBMITTING_PAYMENT || REQUEST_CHECKOUT:
      return fetchingData(state, action);
    case TRANSCATION_UPDATE_FAIL || PAYMENT_FAIL || CHECKOUT_ERROR:
      return hasError(state, action);
    case TRANSCATION_UPDATED || PAYMENT_SUCCESS || RECEIVE_CHECKOUT:
      return dataReceived(state, action);
    default:
      return state;
  }
}
