import {
  RECEIVE_TICKETS_LIST,
  FETCH_TICKET_LIST,
  TICKETS_LIST_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TICKET_LIST:
      return fetchingData(state, action);
    case TICKETS_LIST_ERROR:
      return hasError(state, action);
    case RECEIVE_TICKETS_LIST:
      return dataReceived(state, action);
    default:
      return state;
  }
}
