import {
  RECEIVE_TICKETS_LIST,
  FETCHING_DATA,
  ERROR_ALERT
} from "./ActionTypes";
import { requestTicketsList } from "../apis/apiRequests";

export function fetchData() {
  return {
    type: FETCHING_DATA
  };
}

export const receivedTicketsList = response => {
  return {
    type: RECEIVE_TICKETS_LIST,
    payload: response
  };
};

export function fetchError(error) {
  return {
    type: ERROR_ALERT,
    payload: error
  };
}

export function fetchTickets() {
  return dispatch => {
    dispatch(fetchData());
    requestTicketsList().then(
      response => {
        dispatch(receivedTicketsList(response.data));
      },
      error => {
        dispatch(fetchError(error));
      }
    );
  };
}
