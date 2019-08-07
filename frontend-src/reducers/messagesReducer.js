import { CREATE_MESSAGE } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  errorMsg: "",
  successMsg: ""
};

const withMessage = (state, action) => {
  const { payload } = action;

  return payload
    ? checkObjectUpdate(state, {
        successMsg: payload
      })
    : checkObjectUpdate(state, {
        errorMsg: payload
      });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
      return withMessage(state, action);
    default:
      return state;
  }
}
