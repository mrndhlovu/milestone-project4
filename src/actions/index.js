import {
  RECEIVE_TICKETS_LIST,
  FETCHING_DATA,
  USER_AUTH_FAIL,
  USER_AUTH_LOGOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  CREATE_TICKET,
  RECEIVE_TICKET,
  RECEIVE_TICKET_DETAIL,
  FETCH_TICKET_DETAIL,
  GET_ERRORS,
  CREATE_MESSAGE
} from "./ActionTypes";

import {
  requestTicketsList,
  requestLogin,
  requestSignup,
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
export const authStart = () => {
  const sessionCheck = localStorage.getItem("sessionLife");
  if (sessionCheck) {
    return {
      type: USER_AUTH_START
    };
  } else {
    return {
      type: USER_AUTH_FAIL
    };
  }
};

export const authSuccess = sessionToken => {
  return {
    type: USER_AUTH_SUCCESS,
    payload: sessionToken
  };
};

export const authFail = error => {
  return {
    type: USER_AUTH_FAIL,
    error
  };
};

export const authLogout = () => {
  return {
    type: USER_AUTH_LOGOUT
  };
};

export const checkSession = () => {
  return {
    type: USER_AUTH_FAIL
  };
};

export function startAuth() {
  return dispatch => {
    dispatch(authStart());
    dispatch(checkSession());
  };
}

export function authState() {
  return dispatch => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken == null) {
      dispatch(authLogout());
    } else {
      // session will last for 30mins if the app is not in use
      const sessionLife = new Date(new Date().getTime() + 1800 * 1000);
      if (sessionLife <= new Date()) {
        dispatch(authLogout());
        dispatch(createMessage({ message: "Session expired, Login again!" }));
      } else {
        dispatch(authSuccess(sessionToken));
        const timeNow = new Date();
        const sessionLifeSpan =
          (sessionLife.getTime() - new Date(timeNow).getTime()) / 1000;
        dispatch(checkSessionTime(sessionLifeSpan));
      }
    }
  };
}

// create session
export const creatSession = (sessionToken, sessionLife) => {
  localStorage.setItem("sessionToken", sessionToken);
  localStorage.setItem("sessionLife", sessionLife);
  return dispatch => {
    dispatch(checkSessionTime(1800));
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(fetchData());
    requestLogin(username, password).then(
      response => {
        const sessionToken = response.data.token;
        const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
        dispatch(authSuccess(sessionToken));
        dispatch(creatSession(sessionToken, sessionLife));
        dispatch(createMessage({ message: "You are logged in!" }));
      },
      error => {
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
        dispatch(authFail(error));
      }
    );
  };
};

export const logOut = () => {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("sessionLife");
  return dispatch => {
    dispatch(authLogout());
    dispatch(createMessage({ message: "You have successfully logged out!" }));
  };
};

export function checkSessionTime(sessionLife) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, sessionLife * 1000);
  };
}

export function signup(inputs) {
  return dispatch => {
    dispatch(fetchData());
    requestSignup(inputs).then(
      response => {
        const sessionToken = response.data.token;
        const sessionLife = new Date(new Date().getTime() + 1800 * 1000);
        dispatch(
          createMessage({ message: "You have successfully signed up!" })
        );
        dispatch(authSuccess(sessionToken));
        dispatch(creatSession(sessionToken, sessionLife));
      },
      error => {
        console.log(error.response.data);
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
        dispatch(authFail(error));
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
