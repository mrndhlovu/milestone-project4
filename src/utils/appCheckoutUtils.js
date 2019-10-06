import { getSelectedMemberShip } from "./appUtils";
import {
  UNICORN_FREE_SERVICES,
  UNICORN_PRO_SERVICES
} from "../constants/constants";

const cart = JSON.parse(localStorage.getItem("cart"));

export const getCartItems = () => {
  // const { membershipOrder, ticketOrders } = cart;
  // let cartCount = Object.keys(membershipOrder.id).length + ticketOrders.length;

  return false;
};

export const getMembershipId = () => {
  const id = cart ? cart.membershipOrder.id : 1;
  return id;
};

export const getOrderDesciption = () => {
  if (getSelectedMemberShip() === "pro") return UNICORN_PRO_SERVICES;
  else return UNICORN_FREE_SERVICES;
};

export const getNetPrice = total => {
  const netPrice = (total * 9) / 100;
  return total - netPrice;
};

export const getTotal = price => {
  const total = price - getNetPrice(price);
  return total.toFixed(2);
};
