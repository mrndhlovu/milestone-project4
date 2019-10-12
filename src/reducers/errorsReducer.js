import { USER_AUTH_FAIL } from "../actions/ActionTypes";

import { hasError } from "../utils/appReducersUtil";

const INITIAL_STATE = {
  alertMsg: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_AUTH_FAIL:
      const message = { ...hasError(state, action), alertMsg: action.payload };
      console.log(message);
      return message;
    default:
      return state;
  }
}
