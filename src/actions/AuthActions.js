import {
  USER_AUTH_FAIL,
  USER_AUTH_LOGGEDOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS
} from "./ActionTypes";

import { fetchData } from "./index";

import { requestAuthorisation, requestSignup } from "../apis/apiRequests";

export const authStart = () => {
  return {
    type: USER_AUTH_START
  };
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

export function startAuth() {
  return dispatch => {
    dispatch(authStart());
    checkSession().then(response => {
      dispatch;
    });
  };
}

// create session
const CreatSession = (sessionToken, sessionLife) => {
  localStorage.setItem("sessionToken", sessionToken);
  localStorage.setItem("sessionLife", sessionLife);
  dispatch(authSuccess(sessionToken)), dispatch(checkSessionTime(3600));
};

export function login(username, password) {
  return dispatch => {
    dispatch(fetchData());
    requestAuthorisation(username, password).then(response => {
      const sessionToken = response.data.key;
      const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
      CreatSession(sessionToken, sessionLife);
      error => {
        dispatch(authFail(error));
      };
    });
  };
}

export function logOut() {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("sessionLife");
  dispatch(authLogout());
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
    requestSignup(username, email, password1, password2).then(response => {
      const sessionToken = response.data.key;
      const sessionLife = new Date(new Date().getTime() + 3600 * 1000);
      CreatSession(sessionToken, sessionLife);
      error => {
        dispatch(authFail(error));
      };
    });
  };
}
