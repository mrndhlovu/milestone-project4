import axios from "axios";
import {
  AUTH_EP,
  authQueryParams,
  COMMENTS_EP,
  MEMBERSHIP_EP,
  queryParams,
  TICKETS_EP,
  CHECKOUT_EP,
  getCheckoutBody
} from "../utils/urls";

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

export async function requestTicketSolution(id) {
  return axios.post(
    `${TICKETS_EP}api/paid-tickets/`,
    { ticket_id: id },
    authQueryParams
  );
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
export async function requestAddItemToCart(id, productType, otherProps) {
  return axios.post(
    `${CHECKOUT_EP}/add-to-cart/`,
    getCheckoutBody(id, productType, otherProps),
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
  let body = { stripeToken: localStorage.getItem("stripeToken") };
  return axios.post(`${CHECKOUT_EP}/checkout/`, body, authQueryParams);
};

export async function requestTransactionUpdate() {
  return axios.post(
    `${CHECKOUT_EP}/update-transaction/`,
    { stripeToken: localStorage.getItem("stripeToken") },
    authQueryParams
  );
}
