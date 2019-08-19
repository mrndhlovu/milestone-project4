import {
  RECEIVE_TICKETS_LIST,
  CREATE_TICKET,
  RECEIVE_TICKET,
  RECEIVE_TICKET_DETAIL,
  FETCH_TICKET_DETAIL,
  UPDATED_TICKET_VOTE
} from "./ActionTypes";

import {
  requestTicketsList,
  requestCreateTicket,
  fetchTicketDetail,
  requestTicketVoteUpdate
} from "../apis/apiRequests";

import { fetchData, errorsAlert } from "./index";

function receivedTicketsList(response) {
  return {
    type: RECEIVE_TICKETS_LIST,
    payload: response
  };
}

function fetchTicket(response) {
  return {
    type: FETCH_TICKET_DETAIL,
    payload: response
  };
}

function receiveTicketDetail(response) {
  return {
    type: RECEIVE_TICKET_DETAIL,
    payload: response
  };
}

function creatingTicket(response) {
  return {
    type: CREATE_TICKET,
    payload: response
  };
}

function receiveTicket(response) {
  return {
    type: RECEIVE_TICKET,
    payload: response
  };
}

function updatedVote(response) {
  return {
    type: UPDATED_TICKET_VOTE,
    payload: response
  };
}

// fetch tickets list
export const fetchTicketsList = () => {
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
};

export const createTicket = data => {
  return dispatch => {
    dispatch(creatingTicket());
    requestCreateTicket(data).then(
      response => {
        dispatch(receiveTicket(response));
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
};

export const requestTicketsDetail = id => {
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
};

export const updatedTicketVote = id => {
  return dispatch => {
    dispatch(fetchData());
    requestTicketVoteUpdate(id).then(
      response => {
        dispatch(updatedVote(response.data));
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
};
