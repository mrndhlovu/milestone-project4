import {
  RECEIVE_TICKETS_LIST,
  FETCHING_DATA,
  ERROR_ALERT
} from "../actions/ActionTypes";

const initialSate = {
  ticketsList: []
};

export default function(state = initialSate, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        ticketsList: [],
        requestSuccess: false,
        hasError: false,
        isLoading: true
      };
    case ERROR_ALERT:
      return {
        ...state,
        ticketsList: [],
        requestSuccess: false,
        hasError: true,
        isLoading: false
      };

    case RECEIVE_TICKETS_LIST:
      return {
        ...state,
        ticketsList: action.payload,
        requestSuccess: true,
        hasError: false,
        isLoading: false
      };
    default:
      return state;
  }
}
