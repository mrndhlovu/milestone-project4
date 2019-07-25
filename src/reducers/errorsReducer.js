import { GET_ERRORS } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  alertMsg: {},
  status: ""
};

const withErrorAlert = (state, action) => {
  return checkObjectUpdate(state, {
    alertMsg: action.payload.errorAlert,
    status: action.payload.status
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return withErrorAlert(state, action);
    default:
      return state;
  }
}
