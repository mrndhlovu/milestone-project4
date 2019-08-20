import { CREATE_MESSAGE, GET_ERRORS } from "./ActionTypes";

export const fetchData = action => {
  return {
    type: action
  };
};

export const createMessage = message => {
  return {
    type: CREATE_MESSAGE,
    payload: message
  };
};

export const errorsAlert = errors => {
  return {
    type: GET_ERRORS,
    payload: errors
  };
};
