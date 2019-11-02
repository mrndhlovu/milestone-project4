import {
  RECEIVE_PROFILE_UPDATE,
  PROFILE_UPDATE_ERROR,
  REQUEST_PROFILE_UPDATE
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_PROFILE_UPDATE:
      return fetchingData(state, action);
    case RECEIVE_PROFILE_UPDATE:
      return dataReceived(state, action);
    case PROFILE_UPDATE_ERROR:
      return hasError(state, action);
    default:
      return state;
  }
}
