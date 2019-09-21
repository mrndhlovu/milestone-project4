import {
  RECEIVE_MEMBERSHIPS_LIST,
  FETCHING_MEMBERSHIPS,
  REQUEST_CANCEL_SUBSCRIPTION,
  RECEIVE_SUBSCRIPTION_CANCELED,
  FETCH_MEMBERSHIPS_ERROR,
  CANCEL_SUBSCRIPTION_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CANCEL_SUBSCRIPTION_ERROR || FETCH_MEMBERSHIPS_ERROR:
      return hasError(state, action);
    case REQUEST_CANCEL_SUBSCRIPTION || FETCHING_MEMBERSHIPS:
      return fetchingData(state, action);
    case RECEIVE_MEMBERSHIPS_LIST || RECEIVE_SUBSCRIPTION_CANCELED:
      return dataReceived(state, action);
    default:
      return state;
  }
}
