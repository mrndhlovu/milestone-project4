import {
  FETCH_MEMBER_PROFILE,
  RECEIVE_MEMBER_PROFILE
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
    case FETCH_MEMBER_PROFILE:
      return fetchingUserProfile(state, action);
    case RECEIVE_MEMBER_PROFILE:
      return receivedUserProfile(state, action);
    default:
      return state;
  }
}
