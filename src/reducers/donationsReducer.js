import {
  DONATION_ERROR,
  RECEIVE_DONATION,
  REQUEST_DONATION
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_DONATION:
      return fetchingData(state, action);
    case RECEIVE_DONATION:
      return dataReceived(state, action);
    case DONATION_ERROR:
      return hasError(state, action);
    default:
      return state;
  }
}
