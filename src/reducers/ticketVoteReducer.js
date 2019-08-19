import {
  UPDATED_TICKET_VOTE,
  FETCHING_DATA,
  ERROR_ALERT
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  voteStatus: [],
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const fetchingTicket = (state, action) => {
  return checkObjectUpdate(state, {
    voteStatus: [],
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    voteStatus: [],
    dataReceived: false,
    hasError: true,
    isLoading: false
  });
};

const dataReceived = (state, action) => {
  return {
    voteStatus: action.payload,
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return fetchingTicket(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    case UPDATED_TICKET_VOTE:
      return dataReceived(state, action);
    default:
      return state;
  }
}
