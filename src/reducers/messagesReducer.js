import { CREATE_MESSAGE } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  messageCreated: ""
};

const withMessage = (state, action) => {
  return checkObjectUpdate(state, {
    messageCreated: action.payload
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
