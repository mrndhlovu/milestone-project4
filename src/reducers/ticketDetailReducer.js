import {
  RECEIVE_TICKET_DETAIL,
  FETCH_TICKET_DETAIL,
  TICKET_DETAIL_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TICKET_DETAIL:
      return fetchingData(state, action);
    case TICKET_DETAIL_ERROR:
      return hasError(state, action);
    case RECEIVE_TICKET_DETAIL:
      return dataReceived(state, action);
    default:
      return state;
  }
}
