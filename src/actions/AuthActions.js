import {
  USER_AUTH_FAIL,
  USER_AUTH_LOGOUT,
  USER_AUTH_SUCCESS,
  FETCHING_USER,
  RECEIVED_USER,
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  FETCH_USER_ERROR,
  UPLOAD_ERROR,
  RECEIVE_UPLOAD,
  REQUEST_UPLOAD,
  RECEIVE_PROFILE_UPDATE,
  PROFILE_UPDATE_ERROR,
  REQUEST_PROFILE_UPDATE
} from "./ActionTypes";

import {
  requestLogin,
  requestSignup,
  requestLogout,
  requestUser,
  requestAwsFileUpload,
  requestUpdateUserProfile,
  requestRemoveImageurl
} from "../apis/apiRequests";

import {
  makeRequest,
  createMessage,
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
import { APP_TYPE } from "../constants/constants";

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

// create session if auth response is successful
function createSession(sessionToken, sessionLife) {
  localStorage.setItem("sessionToken", sessionToken);
  localStorage.setItem("sessionLife", sessionLife);

  return dispatch => {
    dispatch(checkSessionTime(1800));
  };
}

// Check auth state, if there is no token, log user out else create a 30 min session
// count down if auth state is not reset in 30min dispatch logout, if reset create a new 30min session
export const authState = () => {
  return dispatch => {
    // session will last for 30mins if the app is not in use
    const sessionLife = new Date(SESSION_LIFE);

    if (sessionLife <= new Date()) {
      destroyLocalStorage(["sessionToken", "sessionLife", "customer"]);
    } else {
      dispatch(checkSessionTime(sessionLife));
      dispatch(fetchUser());

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
        dispatch(createMessage({ successMsg: response.data.message }));
        refresh();
      },
      error => {
        dispatch(dataRequestFail(USER_AUTH_FAIL, error.response.data));
        destroyLocalStorage([
          "sessionToken",
          "sessionLife",
          "currentMembership"
        ]);
      }
    );
  };
};

// Check if there a session token to use for logout, if there is proceed if logout is successful on the server the delete local storage
export const logOut = () => {
  return SESSION_TOKEN
    ? dispatch => {
        dispatch(makeRequest(USER_AUTH_LOGOUT));
        requestLogout(SESSION_TOKEN).then(
          response => {
            destroyLocalStorage([
              "sessionToken",
              "sessionLife",
              "currentMembership",
              "selectedMembership"
            ]);
            dispatch(
              createMessage({ successMsg: "You have successfully logged out!" })
            );
            refresh();
          },
          error => {
            destroyLocalStorage([
              "sessionToken",
              "sessionLife",
              "currentMembership"
            ]);
            dispatch(createMessage({ errorMsg: "Error login out" }));
            refresh();
          }
        );
      }
    : dispatch => {
        return null;
      };
};

// Request sign up, if response is successful create a session
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
        dispatch(createMessage({ errorMsg: "Signup error" }));
        dispatch(dataRequestFail(USER_AUTH_FAIL, error.response.data));
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

export const uploadProfileImage = (file, fileName) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_UPLOAD));
    requestAwsFileUpload(file, fileName).then(
      response => {
        dispatch(requestSuccess(RECEIVE_UPLOAD, response.data));
        const userData = { image: response.location, isImageUpload: true };
        dispatch(updateUserProfile(userData));
      },
      error => {
        dispatch(createMessage({ errorMsg: error.response.data }));
        dispatch(dataRequestFail(UPLOAD_ERROR, error));
      }
    );
  };
};

export const updateUserProfile = userData => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_PROFILE_UPDATE));
    requestUpdateUserProfile(userData).then(
      response => {
        dispatch(requestSuccess(RECEIVE_PROFILE_UPDATE, response.data));
        createMessage({ successMsg: response.data.message });
      },
      error => {
        dispatch(createMessage({ errorMsg: error }));
        dispatch(dataRequestFail(PROFILE_UPDATE_ERROR, error));
      }
    );
  };
};

export const deleteImage = (app, id) => {
  return dispatch => {
    dispatch(makeRequest(REQUEST_PROFILE_UPDATE));
    requestRemoveImageurl(app, id).then(
      response => {
        dispatch(requestSuccess(RECEIVE_PROFILE_UPDATE, response.data));
        createMessage({ successMsg: response.data.message });
        if (app === APP_TYPE.post) {
          refresh();
        }
      },
      error => {
        dispatch(createMessage({ errorMsg: error }));
        dispatch(dataRequestFail(PROFILE_UPDATE_ERROR, error));
      }
    );
  };
};
