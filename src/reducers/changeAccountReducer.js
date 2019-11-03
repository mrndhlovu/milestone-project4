import {
  CANCEL_SUBSCRIPTION_ERROR,
  REQUEST_CANCEL_SUBSCRIPTION,
  RECEIVE_SUBSCRIPTION_CANCELED
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_CANCEL_SUBSCRIPTION:
      return fetchingData(state, action);
    case CANCEL_SUBSCRIPTION_ERROR:
      return hasError(state, action);
    case RECEIVE_SUBSCRIPTION_CANCELED:
      return dataReceived(state, action);
    default:
      return state;
  }
}
