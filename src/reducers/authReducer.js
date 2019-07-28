import {
  USER_AUTH_FAIL,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_LOGOUT
} from "../actions/ActionTypes";
import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  sessionToken: null,
  hasError: null,
  isLoading: false,
  isAuthenticated: false
};

const authStart = (state, action) => {
  return checkObjectUpdate(state, {
    hasError: null,
    isLoading: true
  });
};

const logOut = (state, action) => {
  return checkObjectUpdate(state, {
    sessionToken: null,
    isAuthenticated: false
  });
};

const authFail = (state, action) => {
  return checkObjectUpdate(state, {
    hasError: true,
    isAuthenticated: false,
    sessionToken: null
  });
};

const authSuccess = (state, action) => {
  return checkObjectUpdate(state, {
    hasError: null,
    isLoading: false,
    sessionToken: action,
    isAuthenticated: true
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH_FAIL:
      return authFail(state, action);
    case USER_AUTH_LOGOUT:
      return logOut(state, action);
    case USER_AUTH_START:
      return authStart(state, action);
    case USER_AUTH_SUCCESS:
      return authSuccess(state, action.payload);
    default:
      return state;
  }
}
