import {
  SUBMITTING_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  TRANSCATION_UPDATE_FAIL,
  TRANSCATION_UPDATED,
  UPDATE_TRANSCATION,
  CHOOSEN_MEMBERSHIP_FOUND,
  FIND_MEMBERSHIP_ERROR,
  FIND_CHOOSEN_MEMBERSHIP
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  data: {},
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const fetchingData = (state, action) => {
  return checkObjectUpdate(state, {
    data: {},
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    data: {},
    dataReceived: false,
    hasError: true,
    isLoading: false
  });
};

const dataReceived = (state, action) => {
  return {
    data: action.payload,
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FIND_CHOOSEN_MEMBERSHIP || SUBMITTING_PAYMENT || UPDATE_TRANSCATION:
      return fetchingData(state, action);
    case TRANSCATION_UPDATE_FAIL || PAYMENT_FAIL || FIND_MEMBERSHIP_ERROR:
      return hasError(state, action);
    case TRANSCATION_UPDATED || PAYMENT_SUCCESS || CHOOSEN_MEMBERSHIP_FOUND:
      return dataReceived(state, action);
    default:
      return state;
  }
}
