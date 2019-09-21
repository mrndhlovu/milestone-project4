import { checkObjectUpdate } from "./checkObjectUpdate";

export const hasError = state => {
  return checkObjectUpdate(state, {
    hasError: true
  });
};

export const fetchingData = state => {
  return checkObjectUpdate(state, {
    isLoading: true
  });
};

export const dataReceived = (state, action) => {
  return checkObjectUpdate(state, {
    data: action.payload,
    dataReceived: true,
    isLoading: false,
    hasError: false
  });
};
