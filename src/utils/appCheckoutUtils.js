import { INITIAL_STATE } from "../constants/constants";
import { checkObjectUpdate } from "./checkObjectUpdate";

const hasError = (state, action) => {
  return checkObjectUpdate(state, {
    ...INITIAL_STATE,
    hasError: true
  });
};

export const fetchingData = (state, action) => {
  return checkObjectUpdate(state, {
    ...INITIAL_STATE,
    isLoading: true
  });
};

export const dataReceived = (state, action) => {
  return {
    ...INITIAL_STATE,
    data: action.payload
  };
};
