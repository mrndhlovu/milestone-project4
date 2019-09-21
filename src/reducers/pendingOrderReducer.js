import {
  RECEIVE_PENDING_ORDER,
  REQUEST_PENDING_ORDER,
  PENDING_ORDER_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_PENDING_ORDER:
      return fetchingData(state, action);
    case PENDING_ORDER_ERROR:
      return hasError(state, action);
    case RECEIVE_PENDING_ORDER:
      return dataReceived(state, action);
    default:
      return state;
  }
}
