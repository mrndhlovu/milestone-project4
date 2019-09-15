import { INITIAL_STATE } from "../constants/constants";
import { checkObjectUpdate } from "./checkObjectUpdate";
import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../constants/constants";

const cart = JSON.parse(localStorage.getItem("cart"));

export const hasError = (state, action) => {
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
    data: action.payload,
    dataReceived: true
  };
};

export const getCartItems = () =>
  cart && cart.membership ? cart.membership : null;

export const getMembershipId = () => (cart ? cart.order.membershipId : 1);

export const getOrderDesciption = slug => {
  if (slug === "pro") return UNICORN_PRO_SERVICES;
  else return UNICORN_FREE_SERVICES;
};

export const getNetPrice = total => {
  const netPrice = (total * 9) / 100;
  return total - netPrice;
};
