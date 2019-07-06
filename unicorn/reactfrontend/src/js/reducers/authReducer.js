import {
  USER_AUTH_FAIL,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_LOGGEDOUT
} from "../actions/ActionTypes";
import { checkObjectUpdate } from "../utility/checkObjectUpdate";

const initialState = {
  sessionToken: null,
  hasError: null,
  isLoading: false
};

const authStart = (state, action) => {
  return checkObjectUpdate(state, {
    hasError: null,
    isLoading: true
  });
};

const logOut = (state, action) => {
  return checkObjectUpdate(state, {
    sessionToken: null
  });
};

const authFail = (state, action) => {
  return checkObjectUpdate(state, {
    hasError: true,
    isLoading: false
  });
};

const authSuccess = (state, action) => {
  return checkObjectUpdate(state, {
    hasError: null,
    isLoading: false,
    sessionToken: action.sessionToken
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH_FAIL:
      return authFail(state, action);
    case USER_AUTH_LOGGEDOUT:
      return logOut(state, action);
    case USER_AUTH_START:
      return authStart(state, action);
    case USER_AUTH_SUCCESS:
      return authSuccess(state, action);
    default:
      return state;
  }
}
