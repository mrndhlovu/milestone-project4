import {
  USER_AUTH_FAIL,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_LOGOUT,
  REQUEST_LOGOUT,
  LOGOUT_ERROR
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";
import { AUTH_INITIAL_STATE } from "../constants/constants";

const makeRequest = (state, action) => {
  return checkObjectUpdate(state, {
    ...AUTH_INITIAL_STATE,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    ...AUTH_INITIAL_STATE,
    hasError: true
  });
};

const requestSuccess = (state, action) => {
  return checkObjectUpdate(state, {
    ...AUTH_INITIAL_STATE,
    isAuthenticated: true
  });
};

export default function(state = AUTH_INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH_FAIL || LOGOUT_ERROR:
      return hasError(state, action);
    case USER_AUTH_START || REQUEST_LOGOUT:
      return makeRequest(state, action);
    case USER_AUTH_SUCCESS || USER_AUTH_LOGOUT:
      return requestSuccess(state, action.payload);
    default:
      return state;
  }
}
