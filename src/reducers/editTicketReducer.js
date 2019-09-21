import {
  RECEIVE_TICKET_UPDATE,
  REQUEST_TICKET_UPDATE,
  REQUEST_TICKET_DELETE,
  TICKET_DELETED,
  TICKET_UPDATE_ERROR,
  DELETE_TICKET_ERROR
} from "../actions/ActionTypes";

import { INITIAL_STATE } from "../constants/constants";
import { hasError, fetchingData, dataReceived } from "../utils/appReducersUtil";

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_TICKET_DELETE || REQUEST_TICKET_UPDATE:
      return fetchingData(state, action);
    case TICKET_UPDATE_ERROR || DELETE_TICKET_ERROR:
      return hasError(state, action);
    case RECEIVE_TICKET_UPDATE || TICKET_DELETED:
      return dataReceived(state, action);
    default:
      return state;
  }
}
