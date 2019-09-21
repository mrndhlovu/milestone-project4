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
  RECEIVED_REPLY,
  TICKETS_LIST_ERROR,
  CREATE_TICKET_ERROR,
  TICKET_DETAIL_ERROR,
  TICKET_UPDATE_ERROR,
  DELETE_TICKET_ERROR,
  TICKET_VOTE_ERROR,
  REPLY_ERROR,
  CREATE_COMMENT_ERROR
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

import {
  makeRequest,
  errorsAlert,
  createMessage,
  requestSuccess
} from "./index";

// fetch tickets list
export const fetchTicketsList = () => {
  return dispatch => {
    dispatch(makeRequest(FETCH_TICKET_LIST));
    requestTicketsList().then(
      response => {
        dispatch(requestSuccess(RECEIVE_TICKETS_LIST, response.data));
      },
      error => {
        dispatch(errorsAlert(TICKETS_LIST_ERROR, error));
      }
    );
  };
};

export const createTicket = data => {
  return dispatch => {
    dispatch(makeRequest(CREATE_TICKET));
    requestCreateTicket(data).then(
      response => {
        dispatch(requestSuccess(RECEIVE_TICKET, response));
      },
      error => {
        dispatch(errorsAlert(CREATE_TICKET_ERROR, error));
      }
    );
  };
};

export const requestTicketsDetail = id => {
  return dispatch => {
    dispatch(makeRequest(FETCH_TICKET_DETAIL));
    fetchTicketDetail(id).then(
      response => {
        dispatch(requestSuccess(RECEIVE_TICKET_DETAIL, response.data));
      },
      error => {
        dispatch(errorsAlert(TICKET_DETAIL_ERROR, error));
      }
    );
  };
};

export const updateTicket = (id, updates) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_TICKET_UPDATE));
    requestTicketUpdate(id, updates).then(
      response => {
        dispatch(createMessage({ successMsg: "Ticket updated" }));
        dispatch(requestSuccess(RECEIVE_TICKET_UPDATE, response.data));
      },
      error => {
        dispatch(errorsAlert(TICKET_UPDATE_ERROR, error));
      }
    );
  };
};

export const deleteTicket = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_TICKET_DELETE));
    requestTicketDelete(id).then(
      response => {
        dispatch(createMessage({ successMsg: "Ticket deleted" }));
        dispatch(requestSuccess(TICKET_DELETED, response.data));
      },
      error => {
        dispatch(errorsAlert(DELETE_TICKET_ERROR, error));
      }
    );
  };
};

export const updatedTicketVote = id => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_TICKET_VOTE));
    requestTicketVoteUpdate(id).then(
      response => {
        dispatch(requestSuccess(UPDATED_TICKET_VOTE, response.data));
      },
      error => {
        dispatch(errorsAlert(TICKET_VOTE_ERROR, error));
      }
    );
  };
};

export const createComment = id => {
  return dispatch => {
    dispatch(makeRequest(CREATING_COMMENT));
    requestCreateComment(id).then(
      response => {
        dispatch(requestSuccess(CREATED_COMMENT, response.data));
      },
      error => {
        dispatch(errorsAlert(CREATE_COMMENT_ERROR, error));
      }
    );
  };
};

export const createReply = id => {
  return dispatch => {
    dispatch(makeRequest(CREATING_REPLY));
    requestCreateReply(id).then(
      response => {
        dispatch(requestSuccess(RECEIVED_REPLY, response.data));
      },
      error => {
        dispatch(errorsAlert(REPLY_ERROR, error));
      }
    );
  };
};
