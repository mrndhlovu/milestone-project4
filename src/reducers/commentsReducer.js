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
  return {
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATING_COMMENT || CREATING_REPLY:
      return fetchingData(state, action);
    case ERROR_ALERT:
      return hasError(state, action);
    case CREATED_COMMENT || RECEIVED_REPLY:
      return dataReceived(state, action);
    default:
      return state;
  }
}
