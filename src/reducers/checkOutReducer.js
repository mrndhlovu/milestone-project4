import {
  SUBMITTING_PAYMENT,
  PAYMENT_SUCCESS,
  CHECKOUT_ERROR,
  RECEIVE_CHECKOUT,
  REQUEST_CHECKOUT
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMITTING_PAYMENT:
      return fetchingData(state, action);
    case REQUEST_CHECKOUT:
      return fetchingData(state, action);
    case CHECKOUT_ERROR:
      return hasError(state, action);
    case PAYMENT_SUCCESS:
      return dataReceived(state, action);
    case RECEIVE_CHECKOUT:
      return dataReceived(state, action);
    default:
      return state;
  }
}
