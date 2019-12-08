import { CREATE_MESSAGE, HAS_ERROR } from "./ActionTypes";

export const makeRequest = type => ({ type });

export const requestSuccess = (type, payload) => ({ type, payload });

export const dataRequestFail = (type, payload) => ({ type, payload });

const getFetchErrors = error => ({
  errorAlert: error.response.data,
  status: error.response.status
});

export const createMessage = message => ({
  type: CREATE_MESSAGE,
  payload: message
});

export const alertSignUp = () => {
  return createMessage({ errorMsg: " Let's login first!" });
};

export const hasError = message => ({
  type: HAS_ERROR,
  payload: message
});

export const errorsAlert = (type, errors) => ({
  type: type,
  payload: getFetchErrors(errors)
});
