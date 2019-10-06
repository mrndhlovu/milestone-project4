import axios from "axios";
import {
  AUTH_EP,
  authQueryParams,
  COMMENTS_EP,
  MEMBERSHIP_EP,
  params,
  queryParams,
  TICKETS_EP,
  CHECKOUT_EP,
  getCheckoutBody
} from "../utils/urls";

import { SESSION_TOKEN } from "../constants/localStorageConstants";

import {
  getMembershipType,
  getTransactionUpdate,
  getChoosenMembership
} from "../utils/appUtils";

export async function requestTicketsList() {
  return axios.get(`${TICKETS_EP}`);
}

export async function requestTicketUpdate(id, body) {
  return axios.put(`${TICKETS_EP}update/${id}/`, body);
}

export async function requestTicketDelete(id) {
  return axios.delete(`${TICKETS_EP}delete/${id}/`, authQueryParams);
}

export async function requestTicketVoteUpdate(id) {
  return axios.get(`${TICKETS_EP}api/${id}/vote/`, authQueryParams);
}

export async function requestMembershipsList() {
  return axios.get(`${MEMBERSHIP_EP}`);
}

export async function requestUserMembershipsProfile() {
  return axios.post(`${MEMBERSHIP_EP}member-profile/`, null, authQueryParams);
}

export async function requestCancelSubsricption() {
  return axios.post(
    `${MEMBERSHIP_EP}cancel-subscription/`,
    null,
    authQueryParams
  );
}

export async function requestUser() {
  return axios.get(`${AUTH_EP}user`, authQueryParams);
}

export async function requestUserProfile() {
  return axios.get(`${AUTH_EP}profile/`, authQueryParams);
}

export async function requestUserProfileDetail(id) {
  return axios.get(`${AUTH_EP}profile/${id}/`, authQueryParams);
}

export async function requestSignup(body) {
  return axios.post(`${AUTH_EP}signup`, body, queryParams);
}

export async function requestLogin(body) {
  return axios.post(`${AUTH_EP}login`, body, queryParams);
}

export async function requestLogout() {
  return axios.post(`${AUTH_EP}logout`, null, authQueryParams);
}

export async function requestCreateTicket(body) {
  return axios.post(`${TICKETS_EP}api/create/`, body, authQueryParams);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${TICKETS_EP}${id}/`);
}

export async function requestTicketComments() {
  return axios.get(`${COMMENTS_EP}`);
}

export async function requestCreateComment(body) {
  return axios.post(`${COMMENTS_EP}create-comment/`, body, authQueryParams);
}

export async function requestCreateReply(body) {
  return axios.post(`${COMMENTS_EP}create-reply/`, body, authQueryParams);
}

// Checkout
export async function requestAddItemToCart(id, productType) {
  return axios.post(
    `${CHECKOUT_EP}/add-to-cart/`,
    getCheckoutBody(id, productType),
    authQueryParams
  );
}

export async function requestPendingOrder() {
  return axios.get(`${CHECKOUT_EP}/pending-order/`, authQueryParams);
}

export const requestRemoveItemFromCart = (id, productType) => {
  return axios.post(
    `${CHECKOUT_EP}/remove-item/`,
    getCheckoutBody(id, productType),
    authQueryParams
  );
};

export const requestItemPayment = () => {
  const subscriptionId = localStorage.getItem("subscriptionId");
  let body = { stripeToken: localStorage.getItem("stripeToken") };

  if (subscriptionId !== "null") {
    body = { ...body, subscriptionId };
  }

  return axios.post(`${CHECKOUT_EP}/checkout/`, body, authQueryParams);
};

export async function requestTransactionUpdate() {
  params.headers["Authorization"] = `Token ${SESSION_TOKEN}`;

  return axios.post(
    `${CHECKOUT_EP}/update-transaction/`,
    getTransactionUpdate(),
    params
  );
}
