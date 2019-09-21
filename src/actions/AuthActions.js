import {
  USER_AUTH_FAIL,
  USER_AUTH_LOGOUT,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  FETCHING_USER,
  RECEIVED_USER,
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  FETCH_MEMBER_PROFILE,
  RECEIVE_MEMBER_PROFILE,
  FETCH_USER_ERROR,
  MEMBER_PROFILE_ERROR
} from "./ActionTypes";

import {
  requestLogin,
  requestSignup,
  requestLogout,
  requestUser,
  requestUserMembershipsProfile
} from "../apis/apiRequests";

import {
  makeRequest,
  createMessage,
  hasError,
  dataRequestFail,
  requestSuccess
} from "./index";

import {
  destroyLocalStorage,
  createUserProfile,
  refresh
} from "../utils/appUtils";

import {
  SESSION_TOKEN,
  SESSION_LIFE
} from "../constants/localStorageConstants";

function authStart() {
  if (SESSION_LIFE) {
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
      }, sessionLife * 1000);
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
    // session will last for 30mins if the app is not in use
    const sessionLife = new Date(SESSION_LIFE);

    if (sessionLife <= new Date()) {
      dispatch(makeRequest(USER_AUTH_LOGOUT));
      dispatch(checkSessionTime(sessionLife));
    } else {
      dispatch(fetchUser());
      dispatch(fetchUserProfile());

      dispatch(requestSuccess(USER_AUTH_SUCCESS, SESSION_TOKEN));

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
        refresh();
      },
      error => {
        console.log(error.response.data);
        dispatch(createMessage({ errorMsg: error.response.data }));
        dispatch(dataRequestFail(USER_AUTH_FAIL, error));
      }
    );
  };
};

// Check if there a session token to use for logout, if there is proceed if logout is successful on the server the delete localstorage

export const logOut = () => {
  return SESSION_TOKEN
    ? dispatch => {
        dispatch(makeRequest(USER_AUTH_LOGOUT));
        requestLogout(SESSION_TOKEN).then(response => {
          destroyLocalStorage();
          dispatch(
            createMessage({
              successMsg: "You have successfully logged out!"
            })
          );
          refresh();
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
        dispatch(hasError(USER_AUTH_SUCCESS, sessionToken));
        dispatch(createSession(sessionToken, sessionLife));
        refresh();
      },
      error => {
        dispatch(createMessage({ errorMsg: error.response.data }));
        dispatch(dataRequestFail(USER_AUTH_FAIL, error));
      }
    );
  };
};

//  Fetch logged in user details
export const fetchUser = () => {
  return dispatch => {
    dispatch(makeRequest(FETCHING_USER));
    requestUser().then(
      response => {
        const { username, id, email, current_membership } = response.data;
        dispatch(requestSuccess(RECEIVED_USER, response.data));
        createUserProfile(username, id, email, current_membership);
      },
      error => {
        dispatch(createMessage({ errorMsg: error.response.data }));
        dispatch(dataRequestFail(FETCH_USER_ERROR, error));
      }
    );
  };
};

export const fetchUserProfile = sessionToken => {
  return dispatch => {
    dispatch(makeRequest(FETCH_MEMBER_PROFILE));
    requestUserMembershipsProfile(sessionToken).then(
      response => {
        dispatch(requestSuccess(RECEIVE_MEMBER_PROFILE, response.data));
      },
      error => {
        dispatch(createMessage({ errorMsg: error.response.data }));
        dispatch(dataRequestFail(MEMBER_PROFILE_ERROR, error));
      }
    );
  };
};
