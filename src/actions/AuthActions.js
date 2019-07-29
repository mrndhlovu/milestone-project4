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
      }, sessionLife * 1000);
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

export const startAuth = () => {
  return dispatch => {
    dispatch(authStart());
    dispatch(checkSession());
    dispatch(fetchUser());
  };
};

export const authState = () => {
  return dispatch => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken == null) {
      dispatch(authLogout());
    } else {
      // session will last for 30mins if the app is not in use
      const sessionLife = new Date(new Date().getTime() + 1800 * 1000);
      if (sessionLife <= new Date()) {
        dispatch(authLogout());
        dispatch(createMessage({ errorMsg: "Session expired, Login again!" }));
      } else {
        dispatch(fetchUser());
        dispatch(authSuccess(sessionToken));
        const timeNow = new Date();
        const sessionLifeSpan =
          (sessionLife.getTime() - new Date(timeNow).getTime()) / 1000;
        dispatch(checkSessionTime(sessionLifeSpan));
      }
    }
  };
};

// create session
export const createSession = (sessionToken, sessionLife) => {
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

export const logOut = sessionToken => {
  return dispatch => {
    dispatch(authLogout());
    requestLogout(sessionToken).then(
      () => {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("sessionLife");
        dispatch(
          createMessage({ successMsg: "You have successfully logged out!" })
        );
      },
      error => {
        dispatch(createMessage({ errorMsg: "Error Logging Out" }));
      }
    );
  };
};

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
