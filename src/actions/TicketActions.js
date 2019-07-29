import {
  RECEIVE_TICKETS_LIST,
  FETCHING_DATA,
  CREATE_TICKET,
  RECEIVE_TICKET,
  RECEIVE_TICKET_DETAIL,
  FETCH_TICKET_DETAIL,
  GET_ERRORS,
  CREATE_MESSAGE
} from "./ActionTypes";

import {
  requestTicketsList,
  requestCreateTicket,
  fetchTicketDetail
} from "../apis/apiRequests";

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

// fetch tickets list
export function fetchTicketsList() {
  return dispatch => {
    dispatch(fetchData());
    requestTicketsList().then(
      response => {
        dispatch(receivedTicketsList(response.data));
      },
      error => {
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
      }
    );
  };
}

export const creatingTicket = response => {
  return {
    type: CREATE_TICKET,
    payload: response
  };
};

export const receiveTicket = response => {
  return {
    type: RECEIVE_TICKET,
    payload: response
  };
};

export const errorsAlert = errors => {
  return {
    type: GET_ERRORS,
    payload: errors
  };
};

export function createTicket(data) {
  return dispatch => {
    dispatch(creatingTicket());
    requestCreateTicket(data).then(
      response => {
        dispatch(receiveTicket(response));
      },
      error => {
        const errors = {
          errorAlert: error.response.data.detail,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
      }
    );
  };
}

export const fetchTicket = response => {
  return {
    type: FETCH_TICKET_DETAIL,
    payload: response
  };
};

export const receiveTicketDetail = response => {
  return {
    type: RECEIVE_TICKET_DETAIL,
    payload: response
  };
};

export function requestTicketsDetail(id) {
  return dispatch => {
    dispatch(fetchTicket());
    fetchTicketDetail(id).then(
      response => {
        dispatch(receiveTicketDetail(response.data));
      },
      error => {
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
      }
    );
  };
}

export const createMessage = message => {
  return {
    type: CREATE_MESSAGE,
    payload: message
  };
};
