import {
  USER_AUTH_FAIL,
  USER_AUTH_LOGOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  FETCHING_USER,
  RECEIVED_USER,
  REQUEST_SIGNUP,
  REQUEST_LOGIN
} from "./ActionTypes";

import {
  requestLogin,
  requestSignup,
  requestLogout,
  requestUser
} from "../apis/apiRequests";

import {
  makeRequest,
  createMessage,
  errorsAlert,
  dataRequestFail,
  requestSuccess
} from "./index";

import { getSelectedMemberShip } from "../utils/appUtils";

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
      dispatch(makeRequest(USER_AUTH_LOGOUT));
      dispatch(checkSessionTime(sessionLife));
    } else {
      dispatch(fetchUser());

      dispatch(requestSuccess(USER_AUTH_SUCCESS, sessionToken));

      const sessionLifeSpan =
        (sessionLife.getTime() - new Date().getTime()) / 1000;

      dispatch(checkSessionTime(sessionLifeSpan));
    }
  };
};

export const login = body => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_LOGIN));
    requestLogin(body).then(
      response => {
        const sessionToken = response.data.token;
        const sessionLife = new Date(new Date().getTime() + 1800 * 1000);
        dispatch(requestSuccess(USER_AUTH_SUCCESS, sessionToken));
        dispatch(createSession(sessionToken, sessionLife));
        dispatch(createMessage({ successMsg: "You are logged in!" }));
      },
      error => {
        dispatch(errorsAlert(error));
        dispatch(dataRequestFail(USER_AUTH_FAIL, error));
      }
    );
  };
};

// Check if there a session token to use for logout, if there is proceed if logout is successful on the server the delete localstorage

export const logOut = () => {
  const token = localStorage.getItem("sessionToken");
  return token
    ? dispatch => {
        dispatch(makeRequest(USER_AUTH_LOGOUT));
        requestLogout(token).then(response => {
          localStorage.removeItem("sessionToken");
          localStorage.removeItem("sessionLife");
          localStorage.removeItem("currentMembership");
          localStorage.removeItem("stripeToken");
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
export const signup = data => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_SIGNUP));
    requestSignup(data).then(
      response => {
        const sessionToken = response.data.token;
        const sessionLife = new Date(new Date().getTime() + 1800 * 1000);

        dispatch(
          createMessage({ successMsg: "You have successfully signed up!" })
        );
        dispatch(requestSuccess(USER_AUTH_SUCCESS, sessionToken));
        dispatch(createSession(sessionToken, sessionLife));
      },
      error => {
        const errors = {
          errorAlert: error.response.data,
          status: error.response.status
        };
        dispatch(errorsAlert(errors));
        dispatch(dataRequestFail(USER_AUTH_FAIL, error));
      }
    );
  };
};

//  Fetch logged in user details
export const fetchUser = sessionToken => {
  return dispatch => {
    dispatch(makeRequest(FETCHING_USER));
    requestUser(sessionToken).then(
      response => {
        dispatch(requestSuccess(RECEIVED_USER, response.data));
        localStorage.setItem(
          "currentMembership",
          getSelectedMemberShip(response.data.current_membership)
        );
      },
      error => {
        dispatch(createMessage({ errorMsg: "Session expired, Login again!" }));
      }
    );
  };
};
