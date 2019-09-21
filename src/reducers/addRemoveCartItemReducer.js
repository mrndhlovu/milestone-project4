import {
  ADD_T0_CART_ERROR,
  RECEIVE_ADD_T0_CART,
  REQUEST_ADD_TO_CART,
  DELETE_FROM_CART,
  DELETED_FROM_CART,
  DELETED_FROM_CART_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_ADD_TO_CART || DELETE_FROM_CART:
      return fetchingData(state, action);
    case ADD_T0_CART_ERROR || DELETED_FROM_CART_ERROR:
      return hasError(state, action);
    case RECEIVE_ADD_T0_CART || DELETED_FROM_CART:
      return dataReceived(state, action);
    default:
      return state;
  }
}
