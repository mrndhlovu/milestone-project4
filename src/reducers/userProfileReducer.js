import {
  FETCH_MEMBER_PROFILE,
  RECEIVE_MEMBER_PROFILE,
  MEMBER_PROFILE_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MEMBER_PROFILE:
      return fetchingData(state, action);
    case RECEIVE_MEMBER_PROFILE:
      return dataReceived(state, action);
    case MEMBER_PROFILE_ERROR:
      return hasError(state, action);
    default:
      return state;
  }
}
