import { GET_MESSAGES, CREATE_MESSAGE } from "../actions/ActionTypes";

import { checkObjectUpdate } from "../utils/checkObjectUpdate";

const initialState = {
  message: "",
  messageCreated: ""
};

const withMessage = (state, action) => {
  return checkObjectUpdate(state, {
    message: action.payload,
    messageCreated: ""
  });
};

const createMessage = (state, action) => {
  return checkObjectUpdate(state, {
    message: "",
    messageCreated: action.payload
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return withMessage(state, action);
    case CREATE_MESSAGE:
      return createMessage(state, action);
    default:
      return state;
  }
}
