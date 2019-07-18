import {
  RECEIVE_TICKETS_LIST,
  FETCHING_DATA,
  ERROR_ALERT,
  USER_AUTH_FAIL,
  USER_AUTH_LOGGEDOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  CREATE_TICKET,
  RECEIVE_TICKET
} from "./ActionTypes";

import {
  requestTicketsList,
  requestAuthorisation,
  requestSignup,
  requestCreateTicket
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

export function errorAlert(error) {
  return {
    type: ERROR_ALERT,
    payload: error
  };
}

export function fetchTicketsList() {
  return dispatch => {
    dispatch(fetchData());
    requestTicketsList().then(
      response => {
        dispatch(receivedTicketsList(response.data));
      },
      error => {
        dispatch(errorAlert(error));
      }
    );
  };
}
export const authStart = () => {
  console.log("will check if user have account");

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
    type: USER_AUTH_LOGGEDOUT
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
      const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
      if (sessionLife <= new Date()) {
        dispatch();
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
    dispatch(checkSessionTime(3600));
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(fetchData());
    requestAuthorisation(username, password).then(
      response => {
        console.log("Promise returned; ", response);
        const sessionToken = response.data.key;
        const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
        dispatch(authSuccess(sessionToken));
        dispatch(creatSession(sessionToken, sessionLife));
      },
      error => {
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
        console.log(response);
        const sessionToken = response.data.key;
        const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
        creatSession(sessionToken, sessionLife);
      },
      error => {
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

export function createTicket(data) {
  return dispatch => {
    dispatch(creatingTicket());
    requestCreateTicket(data).then(
      response => {
        dispatch(receiveTicket(response));
      },
      error => {
        dispatch(errorAlert(error));
      }
    );
  };
}
