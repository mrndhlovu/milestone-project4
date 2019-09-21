import {
  RECEIVE_TICKET,
  TICKET_DETAIL_ERROR,
  CREATE_TICKET
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TICKET:
      return fetchingData(state, action);
    case TICKET_DETAIL_ERROR:
      return hasError(state, action);
    case RECEIVE_TICKET:
      return dataReceived(state, action);
    default:
      return state;
  }
}
