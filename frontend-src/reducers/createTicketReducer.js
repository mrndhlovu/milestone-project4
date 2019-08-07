import {
  RECEIVE_TICKET,
  ERROR_ALERT,
  CREATE_TICKET
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  ticketsList: [],
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const createTicket = (state, action) => {
  return checkObjectUpdate(state, {
    ticketsList: [],
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    ticketsList: [],
    dataReceived: false,
    hasError: true,
    isLoading: false
  });
};

const dataReceived = (state, action) => {
  return {
    ticketsList: action.payload,
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TICKET:
      return createTicket(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    case RECEIVE_TICKET:
      return dataReceived(state, action);
    default:
      return state;
  }
}
