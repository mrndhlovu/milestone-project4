import {
  RECEIVED_REPLY,
  CREATED_COMMENT,
  CREATING_COMMENT,
  CREATING_REPLY,
  ERROR_ALERT
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const fetchingData = (state, action) => {
  return checkObjectUpdate(state, {
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    dataReceived: false,
    hasError: true,
    isLoading: false
  });
};

const dataReceived = (state, action) => {
  return checkObjectUpdate(state, {
    dataReceived: true,
    hasError: false,
    isLoading: false
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATING_REPLY:
      return fetchingData(state, action);
    case CREATING_COMMENT:
      return fetchingData(state, action);
    case CREATED_COMMENT:
      return dataReceived(state, action);
    case RECEIVED_REPLY:
      return dataReceived(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    default:
      return state;
  }
}
