import {
  RECEIVE_TICKET_UPDATE,
  REQUEST_TICKET_UPDATE,
  REQUEST_TICKET_DELETE,
  TICKET_DELETED,
  ERROR_ALERT
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  ticket: [],
  ticketUpdated: false,
  hasError: false,
  isLoading: false
};

const updatingTicket = (state, action) => {
  return checkObjectUpdate(state, {
    ticket: [],
    ticketUpdated: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    ticket: [],
    ticketUpdated: false,
    hasError: true,
    isLoading: false
  });
};

const ticketUpdated = (state, action) => {
  return {
    ticket: action.payload,
    ticketUpdated: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TICKET_DELETE || REQUEST_TICKET_UPDATE:
      return updatingTicket(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    case RECEIVE_TICKET_UPDATE || TICKET_DELETED:
      return ticketUpdated(state, action);
    default:
      return state;
  }
}
