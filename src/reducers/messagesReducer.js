import { CREATE_MESSAGE } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  errorMsg: "",
  successMsg: ""
};

const withMessage = (state, action) => {
  const { successMsg } = action;
  return successMsg
    ? checkObjectUpdate(state, {
        successMsg: action.payload
      })
    : checkObjectUpdate(state, {
        errorMsg: action.payload
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
