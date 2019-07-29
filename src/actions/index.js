import { CREATE_MESSAGE, FETCHING_DATA, GET_ERRORS } from "./ActionTypes";

export const fetchData = () => {
  return {
    type: FETCHING_DATA
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
