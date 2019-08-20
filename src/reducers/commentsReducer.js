import {
  FETCH_COMMENTS,
  RECEIVE_COMMENTS,
  ERROR_ALERT
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  commentsList: {},
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const fetchingData = (state, action) => {
  return checkObjectUpdate(state, {
    commentsList: {},
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    commentsList: {},
    dataReceived: false,
    hasError: true,
    isLoading: false
  });
};

const dataReceived = (state, action) => {
  return {
    commentsList: action.payload,
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return fetchingData(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    case RECEIVE_COMMENTS:
      return dataReceived(state, action);
    default:
      return state;
  }
}
