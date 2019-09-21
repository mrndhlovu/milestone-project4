import { HAS_ERROR } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const INITIAL_STATE = {
  alertMsg: {},
  status: ""
};

const withErrorAlert = (state, action) => {
  return checkObjectUpdate(state, {
    alertMsg: action.payload,
    status: action.payload.status
  });
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HAS_ERROR:
      return withErrorAlert(state, action);
    default:
      return state;
  }
}
