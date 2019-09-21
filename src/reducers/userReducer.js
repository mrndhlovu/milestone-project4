import {
  RECEIVED_USER,
  FETCHING_USER,
  FETCH_USER_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCHING_USER:
      return fetchingData(state, action);
    case FETCH_USER_ERROR:
      return hasError(state, action);
    case RECEIVED_USER:
      return dataReceived(state, action);
    default:
      return state;
  }
}
