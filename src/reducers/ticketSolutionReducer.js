import {
  RECEIVE_TICKET_SOLUTION,
  REQUEST_TICKET_SOLUTION,
  TICKET_SOLUTION_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_TICKET_SOLUTION:
      return fetchingData(state, action);
    case TICKET_SOLUTION_ERROR:
      return hasError(state, action);
    case RECEIVE_TICKET_SOLUTION:
      return dataReceived(state, action);
    default:
      return state;
  }
}
