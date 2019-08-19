import {
  FETCHING_USER_PROFILE,
  RECEIVED_USER_PROFILE
} from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  profile: ""
};

const fetchingUserProfile = (state, action) => {
  return checkObjectUpdate(state, {
    profile: ""
  });
};

const receivedUserProfile = (state, action) => {
  return checkObjectUpdate(state, {
    profile: action.payload
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_PROFILE:
      return fetchingUserProfile(state, action);
    case RECEIVED_USER_PROFILE:
      return receivedUserProfile(state, action);
    default:
      return state;
  }
}
