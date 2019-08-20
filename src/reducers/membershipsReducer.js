import {
  RECEIVE_MEMBERSHIPS_LIST,
  FETCHING_MEMBERSHIPS
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
    case FETCHING_MEMBERSHIPS:
      return fetchingData(state, action);
    case RECEIVE_MEMBERSHIPS_LIST:
      return dataReceived(state, action);
    default:
      return state;
  }
}
