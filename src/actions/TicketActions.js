import {
  RECEIVE_TICKETS_LIST,
  CREATE_TICKET,
  RECEIVE_TICKET,
  RECEIVE_TICKET_DETAIL,
  FETCH_TICKET_DETAIL,
  UPDATED_TICKET_VOTE,
  CREATED_COMMENT,
  CREATING_COMMENT,
  REQUEST_TICKET_VOTE,
  FETCH_TICKET_LIST,
  REQUEST_TICKET_UPDATE,
  RECEIVE_TICKET_UPDATE,
  TICKET_DELETED,
  REQUEST_TICKET_DELETE,
  CREATING_REPLY,
  RECEIVED_REPLY
} from "./ActionTypes";

import {
  requestTicketsList,
  requestCreateTicket,
  fetchTicketDetail,
  requestTicketVoteUpdate,
  requestCreateComment,
  requestTicketUpdate,
  requestTicketDelete,
  requestCreateReply
} from "../apis/apiRequests";

import { fetchData, errorsAlert, createMessage } from "./index";

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

function deletingTicket(response) {
  return {
    type: REQUEST_TICKET_DELETE,
    payload: response
  };
}

function updatingTicket(response) {
  return {
    type: REQUEST_TICKET_UPDATE,
    payload: response
  };
}

function receiveTicket(response) {
  return {
    type: RECEIVE_TICKET,
    payload: response
  };
}

function receivedComment(response) {
  return {
    type: CREATED_COMMENT,
    payload: response
  };
}

function receivedCommentReply(response) {
  return {
    type: RECEIVED_REPLY,
    payload: response
  };
}

function receiveTicketUpdate(response) {
  return {
    type: RECEIVE_TICKET_UPDATE,
    payload: response
  };
}

function updatedVote(response) {
  return {
    type: UPDATED_TICKET_VOTE,
    payload: response
  };
}

function ticketDeleted(response) {
  return {
    type: TICKET_DELETED,
    payload: response
  };
}

// fetch tickets list
export const fetchTicketsList = () => {
  return dispatch => {
    dispatch(fetchData(FETCH_TICKET_LIST));
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

export const updateTicket = (id, updates) => {
  return dispatch => {
    dispatch(updatingTicket());
    requestTicketUpdate(id, updates).then(
      response => {
        dispatch(createMessage({ successMsg: "Ticket updated" }));
        dispatch(receiveTicketUpdate(response.data));
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

export const deleteTicket = id => {
  return dispatch => {
    dispatch(deletingTicket());
    requestTicketDelete(id).then(
      response => {
        dispatch(createMessage({ successMsg: "Ticket deleted" }));
        dispatch(ticketDeleted(response.data));
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
    dispatch(fetchData(REQUEST_TICKET_VOTE));
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

export const createComment = id => {
  return dispatch => {
    dispatch(fetchData(CREATING_COMMENT));
    requestCreateComment(id).then(
      response => {
        dispatch(receivedComment(response.data));
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

export const createReply = id => {
  return dispatch => {
    dispatch(fetchData(CREATING_REPLY));
    requestCreateReply(id).then(
      response => {
        dispatch(receivedCommentReply(response.data));
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
