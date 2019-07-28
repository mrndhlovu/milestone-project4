import { RECEIVED_USER, FETCHING_USER } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  user: ""
};

const fetchingUser = (state, action) => {
  return checkObjectUpdate(state, {
    user: ""
  });
};

const receivedUser = (state, action) => {
  return checkObjectUpdate(state, {
    user: action.payload
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER:
      return fetchingUser(state, action);
    case RECEIVED_USER:
      return receivedUser(state, action);
    default:
      return state;
  }
}
