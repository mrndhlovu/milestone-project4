import axios from "axios";
import { baseUrl } from "../utils/urls";
import {
  STRIPE_TOKEN,
  SESSION_TOKEN,
  SUBCRIPTION_ID,
  MEMBERSHIP
} from "../constants/localStorageConstants";

const authQueryParams = {
  headers: {
    Authorization: `Token ${SESSION_TOKEN}`,
    "Content-Type": "application/json"
  }
};

const queryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};

const params = {
  headers: {
    "Content-Type": "text/plain"
  }
};

localStorage.setItem("membership", "pro");

const SELECTED_MEMBERSHIP = {
  membership_type: `${MEMBERSHIP}`
};

const transcationUpdates = {
  subscription_id: `${SUBCRIPTION_ID}`,
  membership_type: `${MEMBERSHIP}`
};

const choosenMembership = {
  stripeToken: `${STRIPE_TOKEN}`,
  membership_type: `${MEMBERSHIP}`
};

export async function requestTicketsList() {
  return axios.get(`${baseUrl}/tickets/`);
}

export async function requestTicketUpdate(id, body) {
  return axios.put(`${baseUrl}/tickets/update/${id}/`, body);
}

export async function requestTicketDelete(id) {
  return axios.delete(`${baseUrl}/tickets/delete/${id}/`, authQueryParams);
}

export async function requestTicketVoteUpdate(id) {
  return axios.get(`${baseUrl}/tickets/api/${id}/vote/`, authQueryParams);
}

export async function requestProductsList() {
  return axios.get(`${baseUrl}/products/`);
}

export async function requestMembershipsList() {
  return axios.get(`${baseUrl}/memberships/types/`);
}

export async function requestUserMembershipsProfile() {
  return axios.get(`${baseUrl}/memberships/user-profile/`, authQueryParams);
}

export async function requestCancelSubsricption() {
  return axios.post(
    `${baseUrl}/memberships/cancel-subscription/`,
    null,
    authQueryParams
  );
}

export async function requestSelectedMemberships() {
  return axios.post(
    `${baseUrl}/memberships/select/`,
    SELECTED_MEMBERSHIP,
    authQueryParams
  );
}

export async function requestMembershipPayment() {
  params.headers["Authorization"] = `Token ${SESSION_TOKEN}`;
  return axios.post(
    `${baseUrl}/memberships/payments/`,
    choosenMembership,
    params
  );
}

export async function requestTransactionUpdate() {
  params.headers["Authorization"] = `Token ${SESSION_TOKEN}`;

  return axios.post(
    `${baseUrl}/memberships/update-transaction/`,
    transcationUpdates,
    params
  );
}

export async function requestUser() {
  return axios.get(`${baseUrl}/accounts/api/auth/user`, authQueryParams);
}

export async function requestUserProfile() {
  return axios.get(`${baseUrl}/accounts/api/auth/profile/`, authQueryParams);
}

export async function requestUserProfileDetail(id) {
  return axios.get(
    `${baseUrl}/accounts/api/auth/profile/${id}/`,
    authQueryParams
  );
}

export async function requestSignup(body) {
  return axios.post(`${baseUrl}/accounts/api/auth/signup`, body, queryParams);
}

export async function requestLogin(body) {
  return axios.post(`${baseUrl}/accounts/api/auth/login`, body, queryParams);
}

export async function requestLogout() {
  return axios.post(
    `${baseUrl}/accounts/api/auth/logout`,
    null,
    authQueryParams
  );
}

export async function requestCreateTicket(body) {
  return axios.post(`${baseUrl}/tickets/api/create/`, body, authQueryParams);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${baseUrl}/tickets/${id}/`);
}

export async function requestTicketComments() {
  return axios.get(`${baseUrl}/comments/`);
}

export async function requestCreateComment(body) {
  return axios.post(
    `${baseUrl}/comments/create-comment/`,
    body,
    authQueryParams
  );
}

export async function requestCreateReply(body) {
  return axios.post(`${baseUrl}/comments/create-reply/`, body, authQueryParams);
}
