import {
  UPDATED_TICKET_VOTE,
  REQUEST_TICKET_VOTE,
  TICKET_VOTE_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_TICKET_VOTE:
      return fetchingData(state, action);
    case TICKET_VOTE_ERROR:
      return hasError(state, action);
    case UPDATED_TICKET_VOTE:
      return dataReceived(state, action);
    default:
      return state;
  }
}
