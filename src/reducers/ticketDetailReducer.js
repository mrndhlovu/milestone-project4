import {
  RECEIVE_TICKET_DETAIL,
  FETCH_TICKET_DETAIL,
  ERROR_ALERT
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  ticket: [],
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const fetchingTicket = (state, action) => {
  return checkObjectUpdate(state, {
    ticket: [],
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    ticket: [],
    dataReceived: false,
    hasError: true,
    isLoading: false
  });
};

const dataReceived = (state, action) => {
  return {
    ticket: action.payload,
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TICKET_DETAIL:
      return fetchingTicket(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    case RECEIVE_TICKET_DETAIL:
      return dataReceived(state, action);
    default:
      return state;
  }
}
