import { CREATE_MESSAGE, GET_ERRORS } from "./ActionTypes";

function getFetchErrors(error) {
  return {
    errorAlert: error.response.data,
    status: error.response.status
  };
}

export const requestSuccess = (type, response) => {
  return { type: type, payload: response };
};

export const makeRequest = action => {
  return {
    type: action
  };
};

export const dataRequestFail = (type, error) => {
  return { type, error };
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
    payload: getFetchErrors(errors)
  };
};
