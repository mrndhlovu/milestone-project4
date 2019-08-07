import {
  USER_AUTH_FAIL,
  USER_AUTH_LOGOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  FETCHING_USER,
  RECEIVED_USER
} from "./ActionTypes";

import {
  requestLogin,
  requestSignup,
  requestLogout,
  requestUser
} from "../apis/apiRequests";

import { fetchData, createMessage, errorsAlert } from "./index";

function authStart() {
  const sessionLife = localStorage.getItem("sessionLife");
  if (sessionLife) {
    return {
      type: USER_AUTH_START
    };
  } else {
    return {
      type: USER_AUTH_FAIL
    };
  }
}

function authSuccess(sessionToken) {
  return {
    type: USER_AUTH_SUCCESS,
    payload: sessionToken
  };
}
function authFail(error) {
  return {
    type: USER_AUTH_FAIL,
    error
  };
}

function authLogout() {
  return {
    type: USER_AUTH_LOGOUT
  };
}

function checkSession() {
  return {
    type: USER_AUTH_FAIL
  };
}

function checkSessionTime(sessionLife) {
  return (
    dispatch => {
      setTimeout(() => {
        dispatch(logOut());
      }, sessionLife);
    },
    error => {}
  );
}

function fetchingUser() {
  return {
    type: FETCHING_USER
  };
}

function receivedUser(user) {
  return {
    type: RECEIVED_USER,
    payload: user
  };
}

// create session if auth response is successfull
function createSession(sessionToken, sessionLife) {
  localStorage.setItem("sessionToken", sessionToken);
  localStorage.setItem("sessionLife", sessionLife);
  return dispatch => {
    dispatch(checkSessionTime(1800));
  };
}

// Start user auth create a seesion and fetch user
export const startAuth = () => {
  return dispatch => {
    dispatch(authStart());
    dispatch(checkSession());
    dispatch(fetchUser());
  };
};

// Check auth state, if there is no token, log user out else create a 30 min session
// count down if auth state is not reset in 30min dispatch logout, if reset create a new 30min session
export const authState = () => {
  return dispatch => {
    const sessionToken = localStorage.getItem("sessionToken");
    const sessionSpan = localStorage.getItem("sessionLife");

    // session will last for 30mins if the app is not in use
    const sessionLife = new Date(sessionSpan);

    if (sessionLife <= new Date()) {
      dispatch(authLogout());
      dispatch(checkSessionTime(sessionLife));
    } else {
      dispatch(fetchUser());
      dispatch(authSuccess(sessionToken));

      const sessionLifeSpan =
        (sessionLife.getTime() - new Date().getTime()) / 1000;

      dispatch(checkSessionTime(sessionLifeSpan));
    }
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(fetchData());
    requestLogin(username, password).then(
      response => {
        const sessionToken = response.data.token;
        const sessionLife = new Date(new Date().getTime() + 1800 * 1000);
        dispatch(authSuccess(sessionToken));
        dispatch(createSession(sessionToken, sessionLife));
        dispatch(createMessage({ successMsg: "You are logged in!" }));
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

// Check if there a session token to use for logout, if there is proceed if logout is successful on the server the delete localstorage

export const logOut = () => {
  const token = localStorage.getItem("sessionToken");
  return token
    ? dispatch => {
        dispatch(authLogout());
        requestLogout(token).then(response => {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("sessionLife");
          dispatch(
            createMessage({
              successMsg: "You have successfully logged out!"
            })
          );
        });
      }
    : dispatch => {
        return null;
      };
};

// Request sign up, if response is successfull create a session
export const signup = inputs => {
  return dispatch => {
    dispatch(fetchData());
    requestSignup(inputs).then(
      response => {
        const sessionToken = response.data.token;
        const sessionLife = new Date(new Date().getTime() + 1800 * 1000);
        dispatch(
          createMessage({ successMsg: "You have successfully signed up!" })
        );
        dispatch(authSuccess(sessionToken));
        dispatch(createSession(sessionToken, sessionLife));
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

//  Fetch logged in user details
export const fetchUser = sessionToken => {
  return dispatch => {
    dispatch(fetchingUser());
    requestUser(sessionToken).then(
      response => {
        dispatch(receivedUser(response.data));
      },
      error => {
        dispatch(createMessage({ errorMsg: "Session expired, Login again!" }));
      }
    );
  };
};
