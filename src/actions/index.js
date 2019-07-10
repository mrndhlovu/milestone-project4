import {
  RECEIVE_TICKETS_LIST,
  FETCHING_DATA,
  ERROR_ALERT,
  USER_AUTH_FAIL,
  USER_AUTH_LOGGEDOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS
} from "./ActionTypes";

import {
  requestTicketsList,
  requestAuthorisation,
  requestSignup
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

export function fetchTickets() {
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

export function checkSession() {
  return {
    type: USER_AUTH_FAIL
  };
}

export function startAuth() {
  return dispatch => {
    dispatch(authStart());
    // dispatch(checkSession());
  };
}

// create session
export function creatSession(sessionToken, sessionLife) {
  localStorage.setItem("sessionToken", sessionToken);
  localStorage.setItem("sessionLife", sessionLife);
  return dispatch => {
    dispatch(authSuccess(sessionToken));
    dispatch(checkSessionTime(3600));
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch(fetchData());
    requestAuthorisation(username, password).then(
      response => {
        const sessionToken = response.data.key;
        const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
        dispatch(creatSession(sessionToken, sessionLife));
      },
      error => {
        dispatch(authFail(error));
      }
    );
  };
}

export function logOut() {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("sessionLife");
  return dispatch => {
    dispatch(authLogout());
  };
}

export const checkSessionTime = sessionLife => {
  return (
    dispatch => {
      setTimeout(() => {
        dispatch(logOut());
      });
      dispatch(authLogout());
    },
    sessionLife * 1000
  );
};

export function signup(username, email, password1, password2) {
  return dispatch => {
    dispatch(fetchData());
    requestSignup(username, email, password1, password2).then(
      response => {
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
