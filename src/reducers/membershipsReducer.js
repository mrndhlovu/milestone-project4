import {
  RECEIVE_MEMBERSHIPS_LIST,
  FETCHING_MEMBERSHIPS,
  REQUEST_CANCEL_SUBSCRIPTION,
  RECEIVE_SUBSCRIPTION_CANCELED
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  membershipList: [],
  dataReceived: false,
  hasError: false,
  isLoading: false
};

const fetchingData = (state, action) => {
  return checkObjectUpdate(state, {
    membershipList: [],
    dataReceived: false,
    hasError: false,
    isLoading: true
  });
};

const dataReceived = (state, action) => {
  return {
    membershipList: action.payload,
    dataReceived: true,
    hasError: false,
    isLoading: false
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CANCEL_SUBSCRIPTION || FETCHING_MEMBERSHIPS:
      return fetchingData(state, action);
    case RECEIVE_MEMBERSHIPS_LIST || RECEIVE_SUBSCRIPTION_CANCELED:
      return dataReceived(state, action);
    default:
      return state;
  }
}
